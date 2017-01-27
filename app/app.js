import { config } from '../package.json';
import Detector from './extern/Detector.js';
import TWEEN from 'gsap';
import {TimelineLite, TweenLite, TimelineMax} from 'gsap';
import glslify from 'glslify';

import * as THREE from 'three';
import { Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

// === Main App
import './resources/MainController.js';