export const validate = (schema, source = 'body') => (req, res, next) => {
  const target = req[source];
  const result = schema.safeParse(target);

  if (!result.success) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  req[source] = result.data;
  return next();
};
