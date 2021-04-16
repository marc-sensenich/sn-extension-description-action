const process = require('process');
const cp = require('child_process');
const path = require('path');

const generateExtensionDescription = require('./generate');
const fs = require('fs');
const temp = require('temp').track();

const INPUT_IDENTIFIER = 'com.example.testing';
const INPUT_NAME = 'Testing';
const INPUT_CONTENT_TYPE = 'SN|Theme';
const INPUT_AREA = 'themes';
const INPUT_VERSION = '0.1.0';
const INPUT_DESCRIPTION = 'Testing description';
const INPUT_URL = 'https://www.example.com/index.html';
const INPUT_DOWNLOAD_URL = 'https://www.example.com/example_0.1.0.zip';
const INPUT_LATEST_URL = 'https://www.example.com/ext.json';
const INPUT_MARKETING_URL = 'https://www.example.com/';
const INPUT_THUMBNAIL_URL = 'https://www.example.com/example.png';
const INPUT_ICON_HEX_COLOR = '#000000';

const BASIC_EXTENSION_INPUT = {
  identifier: INPUT_IDENTIFIER,
  name: INPUT_NAME,
  contentType: INPUT_CONTENT_TYPE,
  area: INPUT_AREA,
  version: INPUT_VERSION,
  description: INPUT_DESCRIPTION,
  url: INPUT_URL,
  downloadUrl: INPUT_DOWNLOAD_URL,
};

const FULL_EXTENSION_INPUT = {
  identifier: INPUT_IDENTIFIER,
  name: INPUT_NAME,
  contentType: INPUT_CONTENT_TYPE,
  area: INPUT_AREA,
  version: INPUT_VERSION,
  description: INPUT_DESCRIPTION,
  url: INPUT_URL,
  downloadUrl: INPUT_DOWNLOAD_URL,
  latestUrl: INPUT_LATEST_URL,
  marketingUrl: INPUT_MARKETING_URL,
  thumbnailUrl: INPUT_THUMBNAIL_URL,
  dockIconBackgroundColor: INPUT_ICON_HEX_COLOR,
  dockIconForegroundColor: INPUT_ICON_HEX_COLOR,
  dockIconBorderColor: INPUT_ICON_HEX_COLOR,
};

const EXPECTED_BASIC_EXTENSION_OUTPUT = {
  identifier: INPUT_IDENTIFIER,
  name: INPUT_NAME,
  content_type: INPUT_CONTENT_TYPE,
  area: INPUT_AREA,
  version: INPUT_VERSION,
  description: INPUT_DESCRIPTION,
  url: INPUT_URL,
  download_url: INPUT_DOWNLOAD_URL,
};

const EXPECTED_FULL_EXTENSION_OUTPUT = {
  identifier: INPUT_IDENTIFIER,
  name: INPUT_NAME,
  content_type: INPUT_CONTENT_TYPE,
  area: INPUT_AREA,
  version: INPUT_VERSION,
  description: INPUT_DESCRIPTION,
  url: INPUT_URL,
  download_url: INPUT_DOWNLOAD_URL,
  latest_url: INPUT_LATEST_URL,
  marketing_url: INPUT_MARKETING_URL,
  thumbnail_url: INPUT_THUMBNAIL_URL,
  dock_icon: {
    type: 'circle',
    background_color: INPUT_ICON_HEX_COLOR,
    foreground_color: INPUT_ICON_HEX_COLOR,
    border_color: INPUT_ICON_HEX_COLOR,
  }
};


describe('Test extension description generation', () => {
  test('generates correct extension description with required fields', () => {
    const extensionDescription = generateExtensionDescription(BASIC_EXTENSION_INPUT);
    expect(extensionDescription).toEqual(EXPECTED_BASIC_EXTENSION_OUTPUT);
  });

  test('generates correct extension description with all fields', () => {
    const extensionDescription = generateExtensionDescription(FULL_EXTENSION_INPUT);
    expect(extensionDescription).toEqual(EXPECTED_FULL_EXTENSION_OUTPUT);
  });
});

describe('Test action execution', () => {
  beforeAll(() => {
    process.env['INPUT_IDENTIFIER'] = INPUT_IDENTIFIER;
    process.env['INPUT_NAME'] = INPUT_NAME;
    process.env['INPUT_CONTENT_TYPE'] = INPUT_CONTENT_TYPE;
    process.env['INPUT_AREA'] = INPUT_AREA;
    process.env['INPUT_VERSION'] = INPUT_VERSION;
    process.env['INPUT_DESCRIPTION'] = INPUT_DESCRIPTION;
    process.env['INPUT_URL'] = INPUT_URL;
    process.env['INPUT_DOWNLOAD_URL'] = INPUT_DOWNLOAD_URL
  });

  afterAll(() => {
    [
      'INPUT_IDENTIFIER',
      'INPUT_NAME',
      'INPUT_CONTENT_TYPE',
      'INPUT_AREA',
      'INPUT_VERSION',
      'INPUT_DESCRIPTION',
      'INPUT_URL',
      'INPUT_DOWNLOAD_URL',
      'INPUT_OUTPUT_PATH',
    ].forEach(element => {
      delete process.env[element];
    });
  });

  test('outputs extension description to STDOUT', () => {
    const ip = path.join(__dirname, 'index.js');
    try {
      cp.execSync(`node ${ip}`, { env: process.env, stdio: 'inherit'});
    } catch (error) {
      console.error(error.message);      
    }
  });

  test('outputs extension description to an output path', done => {
    temp.open({ prefix: 'sn_extension_description_action', suffix: '.json' }, (err, info) => {
      if (err) {
        done(err);
      }

      process.env['INPUT_OUTPUT_PATH'] = info.path;

      const ip = path.join(__dirname, 'index.js');
      cp.execSync(`node ${ip}`, { env: process.env,  stdio: 'inherit'});

      fs.readFile(info.path, 'utf8', (err, data) => {
        if (err) {
          done(err);
        }

        expect(JSON.parse(data)).toEqual(EXPECTED_BASIC_EXTENSION_OUTPUT);
      });

      done();
    });
  });
});
