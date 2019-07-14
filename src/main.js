const R = require("ramda");

module.exports = R.curry(function(option, worksheet) {
  const {
    columns,
    begin,
    end, // Optional. Specify end location or it will stop operation when data is empty
    onData
  } = option;

  const data = [];

  if (R.any(R.identity, [R.not(columns), R.not(begin), R.not(worksheet)])) {
    throw new Error("Missing mandatory parameters.");
  }

  const columnMap = Array.isArray(columns)
    ? R.reduce((map, key) => R.assoc(key, key, map))({}, columns)
    : columns;

  return new Promise(function(resolve, reject) {
    try {
      let index = begin;
      const limit = end || Infinity;
      const dispatch = typeof onData === "function" ? onData : R.identity;

      while (index <= limit) {
        const entry = R.reduce(function(entity, columnKey) {
          return R.assoc(
            R.prop(columnKey, columnMap),
            R.path([`${R.toUpper(columnKey)}${index}`, "v"])(worksheet),
            entity
          );
        })({}, Object.keys(columnMap));

        if (
          R.pipe(
            Object.values,
            R.all(R.not)
          )(entry)
        ) {
          break;
        }

        dispatch(entry, index);
        data.push(entry);
        index++;
      }
    } catch (e) {
      reject(e);
    }

    resolve(data);
  });
});
