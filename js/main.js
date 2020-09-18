'use strict';

var fireballSize = 22;
var wizardSpeed = 3;
var wizardWidth = 70;

var getWizardHeight = function (width) {
  return width * 1.337;
};

var getFireballSpeed = function (isLeft) {
  return direction ? 2 : 5;
};

var getWizardX = function (gameFieldWidth) {
  return (gameFieldWidth - wizardWidth) / 2;
};

var getWizardY = function (gameFieldHeight) {
  return gameFieldHeight / 3;
};
