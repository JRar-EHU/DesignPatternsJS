import BaseFactory from './BaseFactory';
import PyramidFactory from './PyramidFactory';
import OvalFactory from './OvalFactory';

BaseFactory.register('PY', PyramidFactory);
BaseFactory.register('OV', OvalFactory);
