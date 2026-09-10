import { defineRule } from "@oxlint/plugins";
import type { ESTree } from "@oxlint/plugins";

import {
  containsUnknownType,
  functionParameterBindingName,
  functionParameterTypeAnnotation
} from "../shared/function-parameters.ts";
type ParameterOwner =
  | ESTree.ArrowFunctionExpression
  | ESTree.Function
  | ESTree.TSCallSignatureDeclaration
  | ESTree.TSConstructSignatureDeclaration
  | ESTree.TSConstructorType
  | ESTree.TSFunctionType
  | ESTree.TSMethodSignature;

function isTypePredicateSubject(owner: ParameterOwner, parameterName: string): boolean {
  const predicate = owner.returnType?.typeAnnotation;
  return (
    predicate?.type === "TSTypePredicate" &&
    predicate.parameterName.type === "Identifier" &&
    predicate.parameterName.name === parameterName
  );
}

function memberName(callee: ESTree.MemberExpression): string | null {
  const property = callee.property;
  if (property.type === "Identifier") return property.name;
  if (property.type === "Literal" && typeof property.value === "string") return property.value;
  return null;
}

/**
 * Return whether a function is a Promise rejection handler (`.catch(onRejected)`
 * or the second argument of `.then(onFulfilled, onRejected)`). Rejection values
 * are untyped by `Promise`, so `: unknown` there is the ESLint-mandated
 * (`use-unknown-in-catch-callback-variable`) narrowing starting point, not
 * unparsed input the author chose to leave undecoded.
 */
function isPromiseRejectionHandler(node: ParameterOwner & Pick<ESTree.Node, "parent">): boolean {
  if (node.type !== "ArrowFunctionExpression" && node.type !== "FunctionExpression") return false;
  const parent = node.parent;
  if (!parent || parent.type !== "CallExpression") return false;
  const callee = parent.callee;
  if (callee.type !== "MemberExpression") return false;
  const name = memberName(callee);
  if (name === "catch") return parent.arguments.includes(node);
  if (name === "then") return parent.arguments[1] === node;
  return false;
}

/** Disallow unknown inputs except error-cause enrichment, type predicates, and Promise rejection handlers. */
export const noUnknownParametersRule = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow explicitly unknown function parameters except `cause`, type-predicate subjects, and Promise rejection handlers; decode unknown input at its I/O boundary instead."
    },
    messages: {
      unknownParameter:
        "Parameter `{{parameter}}` leaves input unparsed. Accept a named domain type; run the expected schema or parser at the I/O boundary before calling this function."
    }
  },
  createOnce(context) {
    const checkParameters = (node: ParameterOwner) => {
      if (isPromiseRejectionHandler(node)) return;
      for (const parameter of node.params) {
        const annotation = functionParameterTypeAnnotation(parameter);
        if (annotation === null || annotation === undefined) continue;
        if (!containsUnknownType(annotation.typeAnnotation)) continue;
        const name = functionParameterBindingName(parameter, context.sourceCode);
        if (name === "cause" || isTypePredicateSubject(node, name)) continue;
        context.report({
          node: annotation.typeAnnotation,
          messageId: "unknownParameter",
          data: { parameter: name }
        });
      }
    };

    return {
      ArrowFunctionExpression: checkParameters,
      FunctionDeclaration: checkParameters,
      FunctionExpression: checkParameters,
      TSCallSignatureDeclaration: checkParameters,
      TSConstructSignatureDeclaration: checkParameters,
      TSConstructorType: checkParameters,
      TSDeclareFunction: checkParameters,
      TSEmptyBodyFunctionExpression: checkParameters,
      TSFunctionType: checkParameters,
      TSMethodSignature: checkParameters
    };
  }
});
