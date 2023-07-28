// tslint:disable
export const json = [
  {
    $ref: "#/definitions/Expresion",
    definitions: {
      Expresion: {
        additionalProperties: false,
        properties: {
          "==": {
            type: "number",
          },
        },
        required: ["=="],
        type: "object",
      },
    },
  },
];

export const joi = [
  "const Expresion = Joi.object({ '==': Joi.number() })\nconst resolvedType = Joi.lazy(() => Expresion)",
];
