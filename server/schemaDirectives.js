const { SchemaDirectiveVisitor } = require('apollo-server-express');

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const { resolve } = field;
    field.resolve = async function (...args) {
      const context = args[2];
      if (context.authorization === 'ADMIN') {
        console.log('========> admin access');
        return resolve(...args);
      }
      throw 'Sorry! access denied'
    }
  }

  // visitSchema(schema) {
  //   console.log('=======> visitSchema', schema);
  //   const { resolve } = schema;
  //   schema.resolve = async function (...args) {
  //     const context = args[2];
  //     if (context.getContext().authorization === 'ADMIN') {
  //       console.log('========> admin access');
  //       return resolve(...args);
  //     }
  //     console.log('========> user access');
  //   }
  // }
}

module.exports = {
  AuthDirective: AuthDirective,
}
