const classNames = (...args: (string | boolean | undefined)[]) =>
  args.filter(Boolean).join(" ");

export default classNames;
