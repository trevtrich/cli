import {Command} from '@oclif/command';

import {prompt as githubPrompt, scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {scaffold as scaffoldDependabot} from '@form8ion/dependabot-scaffolder';
import {scaffold as scaffoldRenovate} from '@form8ion/renovate-scaffolder';
import {scaffold as scaffoldJest} from '@form8ion/jest-scaffolder';
import {scaffold as scaffoldMocha} from '@form8ion/mocha-scaffolder';
import {scaffold as scaffoldJavaScript} from '@travi/javascript-scaffolder';
import {scaffold as scaffoldAppEngine} from '@travi/node-app-engine-standard-scaffolder';
import {scaffold as scaffoldHapi} from '@form8ion/hapi-scaffolder';
import {scaffold as scaffoldTravisForJavaScript} from '@travi/travis-scaffolder-javascript';
import {scaffold} from '@travi/project-scaffolder';

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
