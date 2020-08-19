const {Command} = require('@oclif/command');
const {prompt: githubPrompt, scaffold: scaffoldGithub} = require('@travi/github-scaffolder');
const {scaffold: scaffoldDependabot} = require('@form8ion/dependabot-scaffolder');
const {scaffold: scaffoldRenovate} = require('@form8ion/renovate-scaffolder');
const {scaffold: scaffoldJest} = require('@form8ion/jest-scaffolder');
const {scaffold: scaffoldMocha} = require('@form8ion/mocha-scaffolder');
const {scaffold: scaffoldJavaScript} = require('@travi/javascript-scaffolder');
const {scaffold: scaffoldAppEngine} = require('@travi/node-app-engine-standard-scaffolder');
const {scaffold: scaffoldHapi} = require('@form8ion/hapi-scaffolder');
const {scaffold: scaffoldTravisForJavaScript} = require('@travi/travis-scaffolder-javascript');
const {scaffold} = require('@travi/project-scaffolder');

class ScaffoldProject extends Command {
  async run() {
    this.log('Starting the scaffolder.');

    scaffold({
      languages: {
        JavaScript: options => scaffoldJavaScript({
          ...options,
          configs: {
            eslint: {scope: '@form8ion'},
            remark: '@form8ion/remark-lint-preset',
            babelPreset: {name: '@form8ion', packageName: '@form8ion/babel-preset'},
            commitlint: {name: '@form8ion', packageName: '@form8ion/commitlint-config'}
          },
          unitTestFrameworks: {mocha: {scaffolder: scaffoldMocha}, jest: {scaffolder: scaffoldJest}},
          ciServices: {Travis: {scaffolder: scaffoldTravisForJavaScript, public: true}},
          hosts: {
            'App Engine Standard': {projectTypes: ['node'], scaffolder: scaffoldAppEngine}
          },
          applicationTypes: {
            Hapi: {scaffolder: scaffoldHapi}
          }
        })
      },
      dependencyUpdaters: {
        Dependabot: {scaffolder: scaffoldDependabot},
        Renovate: {scaffolder: scaffoldRenovate}
      },
      overrides: {copyrightHolder: 'Trevor Richardson'},
      vcsHosts: {
        GitHub: {scaffolder: scaffoldGithub, prompt: githubPrompt, public: true, private: true}
      }
    }).catch(err => {
      console.error(err); // eslint-disable-line no-console
      process.exitCode = 1;
    });
  }
}

ScaffoldProject.description = 'Scaffold a new project.';

module.exports = ScaffoldProject;
