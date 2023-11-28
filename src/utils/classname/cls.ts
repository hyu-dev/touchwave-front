type TClassArgs = (string | Record<string, boolean> | undefined)[];

export const cls = (...classNames: TClassArgs) => {
  let names: string[] = [];

  for (let data of classNames) {
    if (!data) {
      continue;
    }

    if (typeof data === "string") {
      names.push(data);
      continue;
    }

    for (let key in data) {
      if (data[key]) {
        names.push(key);
      }
    }
  }

  return names.join(" ");
};
