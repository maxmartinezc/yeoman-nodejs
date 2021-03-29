var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "group",
                message: "Your project group name",
                default: 'my-group-name'
            },
            {
                type: "input",
                name: "name",
                message: "Your microservices name",
                default: 'ms-name'
            },
            {
                type: "input",
                name: "description",
                message: "Your project description",
                default: ''
            },
            {
                type: "input",
                name: "team",
                message: "Your team name",
                default: 'your-team-name'
            },
            {
                type: "input",
                name: "port",
                message: "port number",
                default: 9001
            },
            {
                type: "input",
                name: "basePath",
                message: "Api base path",
                default: '/ms-name/v1'
            }
        ]);
    }

    writing() {
        const name = this.answers.name.replace(/ /g, "-");
        const group = this.answers.group.replace(/ /g, "-");
        this.conflicter.force = true
        this.destinationRoot('../' + group + '-' + name)
        this.fs.copy(
            this.templatePath(),
            this.destinationPath(),
            { globOptions: { dot: true } }
        );

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), {
            name: name,
            team: this.answers.team,
            description: this.answers.description,
            group: group
        });

        this.fs.copyTpl(
            this.templatePath('app/shared/error.response.js'),
            this.destinationPath('app/shared/error.response.js'), {
            name: name
        });

        this.fs.copyTpl(
            this.templatePath('app/utils/logger.util.js'),
            this.destinationPath('app/utils/logger.util.js'), {
            name: name,
            group: group
        });

        this.fs.copyTpl(
            this.templatePath('app/config/local.config.js'),
            this.destinationPath('app/config/local.config.js'), {
            port: this.answers.port
        });

        this.fs.copyTpl(
            this.templatePath('app/config/default.config.js'),
            this.destinationPath('app/config/default.config.js'), {
            basePath: this.answers.basePath
        });

        this.fs.copyTpl(
            this.templatePath('app/utils/logger.util.js'),
            this.destinationPath('app/utils/logger.util.js'), {
            name: name,
            group: group
        });

        this.fs.copyTpl(
            this.templatePath('swagger/def.json'),
            this.destinationPath('swagger/def.json'), {
            name: name,
            team: this.answers.team,
            group: group
        });

        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'), {
            name: name,
            group: group,
            description: this.answers.description
        });
    }

    installingDependencies() {
        this.npmInstall([
            'express',
            'body-parser',
            'cors',
            'deepmerge',
            'winston',
            'express',
            'express-routemap',
            'fs',
            'joi',
            'lodash',
            'swagger-ui-express'
        ]);

        // dev
        this.npmInstall([
            'chai',
            'chai-arrays',
            'chai-json',
            'chai-url',
            'cross-env',
            'eslint',
            'eslint-config-airbnb',
            'eslint-config-airbnb-base',
            'eslint-plugin-import',
            'eslint-plugin-jsx-a11y',
            'eslint-plugin-react',
            'eslint-plugin-security',
            'eslint-watch',
            'joi-to-swagger',
            'mocha',
            'mockery',
            'nodemon',
            'nyc',
            'pre-push',
            'sinon'
        ],
        { 'save-dev': true });
    }
};