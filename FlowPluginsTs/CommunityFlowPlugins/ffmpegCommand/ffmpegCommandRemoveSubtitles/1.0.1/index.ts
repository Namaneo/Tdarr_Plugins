/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

import { checkFfmpegCommandInit } from '../../../../FlowHelpers/1.0.0/interfaces/flowUtils';
import {
  IpluginDetails,
  IpluginInputArgs,
  IpluginOutputArgs,
} from '../../../../FlowHelpers/1.0.0/interfaces/interfaces';

/* eslint-disable no-param-reassign */
const details = ():IpluginDetails => ({
  name: 'Remove Subtitles',
  description: 'Remove subtitles from the file',
  style: {
    borderColor: '#6efefc',
  },
  tags: 'video',
  isStartPlugin: false,
  pType: '',
  requiresVersion: '2.11.01',
  sidebarPosition: -1,
  icon: '',
  inputs: [
    {
      label: 'Only Unknown Subtitles',
      name: 'ffmpegUnknownSubtitles',
      type: 'boolean',
      defaultValue: 'true',
      inputUI: {
        type: 'switch',
      },
      tooltip: 'Specify whether to only remove unknown subtitles',
    },
  ],
  outputs: [
    {
      number: 1,
      tooltip: 'Continue to next plugin',
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const plugin = (args:IpluginInputArgs):IpluginOutputArgs => {
  const lib = require('../../../../../methods/lib')();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
  args.inputs = lib.loadDefaultValues(args.inputs, details);

  checkFfmpegCommandInit(args);

  args.variables.ffmpegCommand.streams.forEach((stream) => {
    if (stream.codec_type === 'subtitle') {
      const ffmpegUnknownSubtitles = args.inputs.ffmpegUnknownSubtitles === true;

      if (!ffmpegUnknownSubtitles || !stream.codec_name)
        stream.removed = true;
    }
  });

  return {
    outputFileObj: args.inputFileObj,
    outputNumber: 1,
    variables: args.variables,
  };
};

export {
  details,
  plugin,
};
