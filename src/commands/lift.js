const {Command} = require('@oclif/command');
const {lift} = require('@form8ion/lift');
const {scaffold: scaffoldRenovate} = require('@form8ion/renovate-scaffolder');
const {scaffold: scaffoldDependabot} = require('@form8ion/dependabot-scaffolder');
const {removeGreenkeeper} = require('@form8ion/remove-greenkeeper');

class Lift extends Command {
  async run() {
    this.log('Starting project lift..');

    lift({
      scaffolders: {
        Dependabot: scaffoldDependabot,
        Renovate: scaffoldRenovate,
        'Remove Greenkeeper': removeGreenkeeper
      }
    });
  }
}

Lift.description = 'Lift project with additional functionality after creation.';

module.exports = Lift;
