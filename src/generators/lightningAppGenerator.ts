/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { Messages } from '@salesforce/core';
import * as path from 'path';
import { OptionsMap } from '../utils/types';
// tslint:disable-next-line:no-var-requires
const generator = require('yeoman-generator');
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('salesforcedx-templates', 'messages');

export default class LightningAppGenerator extends generator {
  constructor(args: string | string[], options: OptionsMap) {
    super(args, options);
    this.sourceRoot(path.join(__dirname, '..', 'templates', 'lightningapp'));
    this.conflicter.force = false;
  }
  public writing() {
    const { template, outputdir, appname, apiversion, internal } = this.options;
    // tslint:disable-next-line:no-unused-expression
    if (!internal) {
      this.fs.copyTpl(
        this.templatePath('_auradefinitionbundle.app-meta.xml'),
        this.destinationPath(
          path.join(outputdir, appname, `${appname}.app-meta.xml`)
        ),
        {
          apiVersion: apiversion,
          description: messages.getMessage('LightningAppBundle')
        }
      );
    }
    this.fs.copyTpl(
      this.templatePath(`${template}.app`),
      this.destinationPath(path.join(outputdir, appname, `${appname}.app`))
    ),
      this.fs.copyTpl(
        this.templatePath('DefaultLightningAuradoc.auradoc'),
        this.destinationPath(
          path.join(outputdir, appname, `${appname}.auradoc`)
        )
      ),
      this.fs.copyTpl(
        this.templatePath('DefaultLightningController.js'),
        this.destinationPath(
          path.join(outputdir, appname, `${appname}Controller.js`)
        )
      ),
      this.fs.copyTpl(
        this.templatePath('DefaultLightningCss.css'),
        this.destinationPath(path.join(outputdir, appname, `${appname}.css`))
      ),
      this.fs.copyTpl(
        this.templatePath('DefaultLightningHelper.js'),
        this.destinationPath(
          path.join(outputdir, appname, `${appname}Helper.js`)
        )
      ),
      this.fs.copyTpl(
        this.templatePath('DefaultLightningRenderer.js'),
        this.destinationPath(
          path.join(outputdir, appname, `${appname}Renderer.js`)
        )
      ),
      this.fs.copyTpl(
        this.templatePath('DefaultLightningSVG.svg'),
        this.destinationPath(path.join(outputdir, appname, `${appname}.svg`))
      );
  }
}
