#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const dedent = require("dedent");

const arg = hideBin(process.argv);
const cli = yargs(arg);

yargs(arg)
  .usage("Usage: $0 <command> [options]")
  .strict()
  .demandCommand(
    1,
    "A command is required. Pass --help to see all available commands and options."
  )
  .fail((msg, err) => {})
  .alias("h", "help")
  .alias("v", "version")
  .option({
    debug: {
      type: "boolean",
      describe: "Bootstrap debug mode",
      alias: "d",
    },
  })
  .option("registry", {
    type: "string",
    describe: "Define global registry",
    alias: "r",
  })
  .group(["debug"], "Dev Options:")
  .group(["registry"], "Extra Options")
  .wrap(cli.terminalWidth()).epilog(dedent`
  When a command fails, all logs are written to lerna-debug.log in the current working directory.

  For more information, find our manual at https://github.com/lerna/lerna
`).argv;
