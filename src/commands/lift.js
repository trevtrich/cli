const {Command} = require('@oclif/command');
const {lift} = require('@form8ion/lift');
const cli = require('cli-ux').default;
const {scaffold: scaffoldRenovate} = require('@form8ion/renovate-scaffolder');
const {scaffold: scaffoldDependabot} = require('@form8ion/dependabot-scaffolder');
const {removeGreenkeeper} = require('@form8ion/remove-greenkeeper');

class Lift extends Command {
  async run() {
    this.log('Starting project lift..');

    lift({
      scaffolders: {
        Dependabot: async options => {
          const owner = await cli.prompt('Who is the owner of the current repo?');
          const name = await cli.prompt('What is the name of this repo?');

          return scaffoldDependabot({...options, vcs: {owner, name}});
        },
        Renovate: scaffoldRenovate,
        'Remove Greenkeeper': removeGreenkeeper
      }
    });
  }
}

Lift.description = 'Lift project with additional functionality after creation.';

module.exports = Lift;
