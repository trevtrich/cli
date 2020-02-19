const {Command} = require('@oclif/command');
const {prompt: githubPrompt, scaffold: scaffoldGithub} = require('@travi/github-scaffolder');
const {scaffold: scaffoldJavaScript} = require('@travi/javascript-scaffolder');
const {scaffold} = require('@travi/project-scaffolder');

class ScaffoldProject extends Command {
  async run() {
    this.log('Starting the scaffolder.');

    scaffold({
      languages: {JavaScript: scaffoldJavaScript},
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
