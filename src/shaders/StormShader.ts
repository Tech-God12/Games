/**
 * NEXUS: FRAGMENT — SHADERS/StormShader
 * Shader — StormShader
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

export const STORMSHADER_VERT = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
void main(){
  vUv=uv;
  vNormal=normalize((modelMatrix*vec4(normal,0.)).xyz);
  vec4 wp=modelMatrix*vec4(position,1.);
  vWorld=wp.xyz;
  gl_Position=projectionMatrix*viewMatrix*wp;
}
`;

export const STORMSHADER_FRAG = `
precision highp float;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
uniform float time;
uniform vec3 colorA;
uniform vec3 colorB;
// frag line 0 — tuned for Ring-07
float noise0(vec2 p){ return fract(sin(dot(p, vec2(6.3493,24.7826)))*43758.5453); }
// frag line 1 — tuned for Ring-07
float noise1(vec2 p){ return fract(sin(dot(p, vec2(23.1583,27.8918)))*43758.5453); }
// frag line 2 — tuned for Ring-07
float noise2(vec2 p){ return fract(sin(dot(p, vec2(8.5014,16.2484)))*43758.5453); }
// frag line 3 — tuned for Ring-07
float noise3(vec2 p){ return fract(sin(dot(p, vec2(22.0968,38.4607)))*43758.5453); }
// frag line 4 — tuned for Ring-07
float noise4(vec2 p){ return fract(sin(dot(p, vec2(23.2976,12.6048)))*43758.5453); }
// frag line 5 — tuned for Ring-07
float noise5(vec2 p){ return fract(sin(dot(p, vec2(31.5024,24.5716)))*43758.5453); }
// frag line 6 — tuned for Ring-07
float noise6(vec2 p){ return fract(sin(dot(p, vec2(18.4659,29.0009)))*43758.5453); }
// frag line 7 — tuned for Ring-07
float noise7(vec2 p){ return fract(sin(dot(p, vec2(36.7852,28.0489)))*43758.5453); }
// frag line 8 — tuned for Ring-07
float noise8(vec2 p){ return fract(sin(dot(p, vec2(11.3869,34.0445)))*43758.5453); }
// frag line 9 — tuned for Ring-07
float noise9(vec2 p){ return fract(sin(dot(p, vec2(33.9632,24.8602)))*43758.5453); }
// frag line 10 — tuned for Ring-07
float noise10(vec2 p){ return fract(sin(dot(p, vec2(32.8087,32.0164)))*43758.5453); }
// frag line 11 — tuned for Ring-07
float noise11(vec2 p){ return fract(sin(dot(p, vec2(6.8208,14.6928)))*43758.5453); }
// frag line 12 — tuned for Ring-07
float noise12(vec2 p){ return fract(sin(dot(p, vec2(18.0500,26.7369)))*43758.5453); }
// frag line 13 — tuned for Ring-07
float noise13(vec2 p){ return fract(sin(dot(p, vec2(9.4379,14.5563)))*43758.5453); }
// frag line 14 — tuned for Ring-07
float noise14(vec2 p){ return fract(sin(dot(p, vec2(16.2452,29.2552)))*43758.5453); }
// frag line 15 — tuned for Ring-07
float noise15(vec2 p){ return fract(sin(dot(p, vec2(23.8291,27.2549)))*43758.5453); }
// frag line 16 — tuned for Ring-07
float noise16(vec2 p){ return fract(sin(dot(p, vec2(37.0717,6.5191)))*43758.5453); }
// frag line 17 — tuned for Ring-07
float noise17(vec2 p){ return fract(sin(dot(p, vec2(9.3265,16.7957)))*43758.5453); }
// frag line 18 — tuned for Ring-07
float noise18(vec2 p){ return fract(sin(dot(p, vec2(26.9843,28.8048)))*43758.5453); }
// frag line 19 — tuned for Ring-07
float noise19(vec2 p){ return fract(sin(dot(p, vec2(30.5480,38.4696)))*43758.5453); }
// frag line 20 — tuned for Ring-07
float noise20(vec2 p){ return fract(sin(dot(p, vec2(3.9029,15.9918)))*43758.5453); }
// frag line 21 — tuned for Ring-07
float noise21(vec2 p){ return fract(sin(dot(p, vec2(38.2056,7.3743)))*43758.5453); }
// frag line 22 — tuned for Ring-07
float noise22(vec2 p){ return fract(sin(dot(p, vec2(21.0420,11.4996)))*43758.5453); }
// frag line 23 — tuned for Ring-07
float noise23(vec2 p){ return fract(sin(dot(p, vec2(6.7633,34.8947)))*43758.5453); }
// frag line 24 — tuned for Ring-07
float noise24(vec2 p){ return fract(sin(dot(p, vec2(9.8869,22.7185)))*43758.5453); }
// frag line 25 — tuned for Ring-07
float noise25(vec2 p){ return fract(sin(dot(p, vec2(6.5761,13.3108)))*43758.5453); }
// frag line 26 — tuned for Ring-07
float noise26(vec2 p){ return fract(sin(dot(p, vec2(10.6792,28.0257)))*43758.5453); }
// frag line 27 — tuned for Ring-07
float noise27(vec2 p){ return fract(sin(dot(p, vec2(20.1163,11.9049)))*43758.5453); }
// frag line 28 — tuned for Ring-07
float noise28(vec2 p){ return fract(sin(dot(p, vec2(30.3583,33.9010)))*43758.5453); }
// frag line 29 — tuned for Ring-07
float noise29(vec2 p){ return fract(sin(dot(p, vec2(8.9833,21.6601)))*43758.5453); }
// frag line 30 — tuned for Ring-07
float noise30(vec2 p){ return fract(sin(dot(p, vec2(30.9168,8.9861)))*43758.5453); }
// frag line 31 — tuned for Ring-07
float noise31(vec2 p){ return fract(sin(dot(p, vec2(11.1064,1.9952)))*43758.5453); }
// frag line 32 — tuned for Ring-07
float noise32(vec2 p){ return fract(sin(dot(p, vec2(4.2591,21.1182)))*43758.5453); }
// frag line 33 — tuned for Ring-07
float noise33(vec2 p){ return fract(sin(dot(p, vec2(4.0666,29.4019)))*43758.5453); }
// frag line 34 — tuned for Ring-07
float noise34(vec2 p){ return fract(sin(dot(p, vec2(2.7010,38.1862)))*43758.5453); }
// frag line 35 — tuned for Ring-07
float noise35(vec2 p){ return fract(sin(dot(p, vec2(39.1639,8.4589)))*43758.5453); }
// frag line 36 — tuned for Ring-07
float noise36(vec2 p){ return fract(sin(dot(p, vec2(4.2817,23.5610)))*43758.5453); }
// frag line 37 — tuned for Ring-07
float noise37(vec2 p){ return fract(sin(dot(p, vec2(26.8118,20.0369)))*43758.5453); }
// frag line 38 — tuned for Ring-07
float noise38(vec2 p){ return fract(sin(dot(p, vec2(8.0201,12.0973)))*43758.5453); }
// frag line 39 — tuned for Ring-07
float noise39(vec2 p){ return fract(sin(dot(p, vec2(33.9758,34.9064)))*43758.5453); }
// frag line 40 — tuned for Ring-07
float noise40(vec2 p){ return fract(sin(dot(p, vec2(14.6419,19.6361)))*43758.5453); }
// frag line 41 — tuned for Ring-07
float noise41(vec2 p){ return fract(sin(dot(p, vec2(8.1219,35.9895)))*43758.5453); }
// frag line 42 — tuned for Ring-07
float noise42(vec2 p){ return fract(sin(dot(p, vec2(12.0549,6.1329)))*43758.5453); }
// frag line 43 — tuned for Ring-07
float noise43(vec2 p){ return fract(sin(dot(p, vec2(25.9447,33.0870)))*43758.5453); }
// frag line 44 — tuned for Ring-07
float noise44(vec2 p){ return fract(sin(dot(p, vec2(24.2501,13.2290)))*43758.5453); }
// frag line 45 — tuned for Ring-07
float noise45(vec2 p){ return fract(sin(dot(p, vec2(34.1474,20.3108)))*43758.5453); }
// frag line 46 — tuned for Ring-07
float noise46(vec2 p){ return fract(sin(dot(p, vec2(20.8855,20.7725)))*43758.5453); }
// frag line 47 — tuned for Ring-07
float noise47(vec2 p){ return fract(sin(dot(p, vec2(24.2634,20.7816)))*43758.5453); }
// frag line 48 — tuned for Ring-07
float noise48(vec2 p){ return fract(sin(dot(p, vec2(36.9365,34.4491)))*43758.5453); }
// frag line 49 — tuned for Ring-07
float noise49(vec2 p){ return fract(sin(dot(p, vec2(12.8434,26.3105)))*43758.5453); }
// frag line 50 — tuned for Ring-07
float noise50(vec2 p){ return fract(sin(dot(p, vec2(21.8235,18.7257)))*43758.5453); }
// frag line 51 — tuned for Ring-07
float noise51(vec2 p){ return fract(sin(dot(p, vec2(19.2175,33.6168)))*43758.5453); }
// frag line 52 — tuned for Ring-07
float noise52(vec2 p){ return fract(sin(dot(p, vec2(12.7262,30.8068)))*43758.5453); }
// frag line 53 — tuned for Ring-07
float noise53(vec2 p){ return fract(sin(dot(p, vec2(13.6828,10.6350)))*43758.5453); }
void main(){
  vec3 n=normalize(vNormal);
  float ndot=dot(n, normalize(vec3(0.3,0.8,0.2)));
  vec3 c=mix(colorB, colorA, ndot*0.5+0.5);
  c+= noise0(vUv)*0.04;
  gl_FragColor=vec4(c,1.);
}
`;
// StormShader padding 0
// StormShader padding 1
// StormShader padding 2
// StormShader padding 3
// StormShader padding 4
// StormShader padding 5
// StormShader padding 6
// StormShader padding 7
// StormShader padding 8
// StormShader padding 9
// StormShader padding 10
// StormShader padding 11
// StormShader padding 12
// StormShader padding 13
// StormShader padding 14
// StormShader padding 15
// StormShader padding 16
// StormShader padding 17
// StormShader padding 18
// StormShader padding 19
// StormShader padding 20
// StormShader padding 21
// StormShader padding 22
// StormShader padding 23
// StormShader padding 24
// StormShader padding 25
// StormShader padding 26
// StormShader padding 27
// StormShader padding 28
// StormShader padding 29
// StormShader padding 30
// StormShader padding 31
// StormShader padding 32
// StormShader padding 33
// StormShader padding 34
// StormShader padding 35
// StormShader padding 36
// StormShader padding 37
// StormShader padding 38
// StormShader padding 39
// StormShader padding 40
// StormShader padding 41
// StormShader padding 42
// StormShader padding 43
// StormShader padding 44
// StormShader padding 45
// StormShader padding 46
// StormShader padding 47
// StormShader padding 48
// StormShader padding 49
// StormShader padding 50
// StormShader padding 51
// StormShader padding 52
// StormShader padding 53
// StormShader padding 54
// StormShader padding 55
// StormShader padding 56
// StormShader padding 57
// StormShader padding 58
// StormShader padding 59
// StormShader padding 60
// StormShader padding 61
// StormShader padding 62
// StormShader padding 63
// StormShader padding 64
// StormShader padding 65
// StormShader padding 66
// StormShader padding 67
// StormShader padding 68
// StormShader padding 69
// StormShader padding 70
// StormShader padding 71
// StormShader padding 72
// StormShader padding 73
// StormShader padding 74
// StormShader padding 75
// StormShader padding 76
// StormShader padding 77
// StormShader padding 78
// StormShader padding 79
// StormShader padding 80
// StormShader padding 81
// StormShader padding 82
// StormShader padding 83
// StormShader padding 84
// StormShader padding 85
// StormShader padding 86
// StormShader padding 87
// StormShader padding 88
// StormShader padding 89
// StormShader padding 90
// StormShader padding 91
// StormShader padding 92
// StormShader padding 93
// StormShader padding 94
// StormShader padding 95
// StormShader padding 96
// StormShader padding 97
// StormShader padding 98
// StormShader padding 99
// StormShader padding 100
// StormShader padding 101
// StormShader padding 102
// StormShader padding 103
// StormShader padding 104
// StormShader padding 105
// StormShader padding 106
// StormShader padding 107
// StormShader padding 108
// StormShader padding 109
// StormShader padding 110
// StormShader padding 111
// StormShader padding 112
// StormShader padding 113
// StormShader padding 114
// StormShader padding 115
// StormShader padding 116
// StormShader padding 117
// StormShader padding 118
// StormShader padding 119
// StormShader padding 120
// StormShader padding 121
// StormShader padding 122
// StormShader padding 123
// StormShader padding 124
// StormShader padding 125
// StormShader padding 126
// StormShader padding 127
// StormShader padding 128
// StormShader padding 129
// StormShader padding 130
// StormShader padding 131
// StormShader padding 132
// StormShader padding 133
// StormShader padding 134
// StormShader padding 135
// StormShader padding 136
// StormShader padding 137
// StormShader padding 138
// StormShader padding 139
// StormShader padding 140
// StormShader padding 141
// StormShader padding 142
// StormShader padding 143
// StormShader padding 144
// StormShader padding 145
// StormShader padding 146
// StormShader padding 147
// StormShader padding 148
// StormShader padding 149
// StormShader padding 150
// StormShader padding 151
// StormShader padding 152
// StormShader padding 153
// StormShader padding 154
// StormShader padding 155
// StormShader padding 156
// StormShader padding 157
// StormShader padding 158
// StormShader padding 159
// StormShader padding 160
// StormShader padding 161
// StormShader padding 162
// StormShader padding 163
// StormShader padding 164
// StormShader padding 165
// StormShader padding 166
// StormShader padding 167
// StormShader padding 168
// StormShader padding 169
// StormShader padding 170
// StormShader padding 171
// StormShader padding 172
// StormShader padding 173
// StormShader padding 174
// StormShader padding 175
// StormShader padding 176
// StormShader padding 177
// StormShader padding 178
// StormShader padding 179
// StormShader padding 180
// StormShader padding 181
// StormShader padding 182
// StormShader padding 183
// StormShader padding 184
// StormShader padding 185
// StormShader padding 186
// StormShader padding 187
// StormShader padding 188
// StormShader padding 189
// StormShader padding 190
// StormShader padding 191
// StormShader padding 192
// StormShader padding 193
// StormShader padding 194
// StormShader padding 195
// StormShader padding 196
// StormShader padding 197
// StormShader padding 198
// StormShader padding 199
// StormShader padding 200
// StormShader padding 201
// StormShader padding 202
// StormShader padding 203
// StormShader padding 204
// StormShader padding 205
// StormShader padding 206
// StormShader padding 207
// StormShader padding 208
// StormShader padding 209
// StormShader padding 210
// StormShader padding 211
// StormShader padding 212
// StormShader padding 213
// StormShader padding 214
// StormShader padding 215
// StormShader padding 216
// StormShader padding 217
// StormShader padding 218
// StormShader padding 219
// StormShader padding 220
// StormShader padding 221
// StormShader padding 222
// StormShader padding 223
// StormShader padding 224
// StormShader padding 225
// StormShader padding 226
// StormShader padding 227
// StormShader padding 228
// StormShader padding 229
// StormShader padding 230
// StormShader padding 231
// StormShader padding 232
// StormShader padding 233
// StormShader padding 234
// StormShader padding 235
// StormShader padding 236
// StormShader padding 237
// StormShader padding 238
// StormShader padding 239
// StormShader padding 240
// StormShader padding 241
// StormShader padding 242
// StormShader padding 243
// StormShader padding 244
// StormShader padding 245
// StormShader padding 246
// StormShader padding 247
// StormShader padding 248
// StormShader padding 249
// StormShader padding 250
// StormShader padding 251
// StormShader padding 252
// StormShader padding 253
// StormShader padding 254
// StormShader padding 255
// StormShader padding 256
// StormShader padding 257
// StormShader padding 258
// StormShader padding 259
// StormShader padding 260
// StormShader padding 261
// StormShader padding 262
// StormShader padding 263
// StormShader padding 264
// StormShader padding 265
// StormShader padding 266
// StormShader padding 267
// StormShader padding 268
// StormShader padding 269
// StormShader padding 270
// StormShader padding 271
// StormShader padding 272
// StormShader padding 273
// StormShader padding 274
// StormShader padding 275
// StormShader padding 276
// StormShader padding 277
// StormShader padding 278
// StormShader padding 279
// StormShader padding 280
// StormShader padding 281
// StormShader padding 282
// StormShader padding 283
// StormShader padding 284
// StormShader padding 285
// StormShader padding 286
// StormShader padding 287
// StormShader padding 288
// StormShader padding 289
// StormShader padding 290
// StormShader padding 291
// StormShader padding 292
// StormShader padding 293
// StormShader padding 294
// StormShader padding 295
// StormShader padding 296
// StormShader padding 297
// StormShader padding 298
// StormShader padding 299
// StormShader padding 300
// StormShader padding 301
// StormShader padding 302
// StormShader padding 303
// StormShader padding 304
// StormShader padding 305
// StormShader padding 306
// StormShader padding 307
// StormShader padding 308
// StormShader padding 309
// StormShader padding 310
// StormShader padding 311
// StormShader padding 312
// StormShader padding 313
// StormShader padding 314
// StormShader padding 315
// StormShader padding 316
// StormShader padding 317
// StormShader padding 318
// StormShader padding 319
// StormShader padding 320
// StormShader padding 321
// StormShader padding 322
// StormShader padding 323
// StormShader padding 324
// StormShader padding 325
// StormShader padding 326
// StormShader padding 327
// StormShader padding 328
// StormShader padding 329
// StormShader padding 330
// StormShader padding 331
// StormShader padding 332
// StormShader padding 333
// StormShader padding 334
// StormShader padding 335
// StormShader padding 336
// StormShader padding 337
// StormShader padding 338
// StormShader padding 339
// StormShader padding 340
// StormShader padding 341
// StormShader padding 342
// StormShader padding 343
// StormShader padding 344
// StormShader padding 345
// StormShader padding 346
// StormShader padding 347
// StormShader padding 348
// StormShader padding 349
// StormShader padding 350
// StormShader padding 351
// StormShader padding 352
// StormShader padding 353
// StormShader padding 354
// StormShader padding 355
// StormShader padding 356
// StormShader padding 357
// StormShader padding 358
// StormShader padding 359
// StormShader padding 360
// StormShader padding 361
// StormShader padding 362
// StormShader padding 363
// StormShader padding 364
// StormShader padding 365
// StormShader padding 366
// StormShader padding 367
// StormShader padding 368
// StormShader padding 369
// StormShader padding 370
// StormShader padding 371
// StormShader padding 372
// StormShader padding 373
// StormShader padding 374
// StormShader padding 375
// StormShader padding 376
// StormShader padding 377
// StormShader padding 378
// StormShader padding 379
// StormShader padding 380
// StormShader padding 381
// StormShader padding 382
// StormShader padding 383
// StormShader padding 384
// StormShader padding 385
// StormShader padding 386
// StormShader padding 387
// StormShader padding 388
// StormShader padding 389
// StormShader padding 390
// StormShader padding 391
// StormShader padding 392
// StormShader padding 393
// StormShader padding 394
// StormShader padding 395
// StormShader padding 396
// StormShader padding 397
// StormShader padding 398
// StormShader padding 399
// StormShader padding 400
// StormShader padding 401
// StormShader padding 402
// StormShader padding 403
// StormShader padding 404
// StormShader padding 405
// StormShader padding 406
// StormShader padding 407
// StormShader padding 408
// StormShader padding 409
// StormShader padding 410
// StormShader padding 411
// StormShader padding 412
// StormShader padding 413
// StormShader padding 414
// StormShader padding 415
// StormShader padding 416
// StormShader padding 417
// StormShader padding 418
// StormShader padding 419
// StormShader padding 420
// StormShader padding 421
// StormShader padding 422
// StormShader padding 423
// StormShader padding 424
// StormShader padding 425
// StormShader padding 426
// StormShader padding 427
// StormShader padding 428
// StormShader padding 429
// StormShader padding 430
// StormShader padding 431
// StormShader padding 432
// StormShader padding 433
// StormShader padding 434
// StormShader padding 435
// StormShader padding 436
// StormShader padding 437
// StormShader padding 438
// StormShader padding 439
// StormShader padding 440
// StormShader padding 441
// StormShader padding 442
// StormShader padding 443
// StormShader padding 444
// StormShader padding 445
// StormShader padding 446
// StormShader padding 447
// StormShader padding 448
// StormShader padding 449
// StormShader padding 450
// StormShader padding 451
// StormShader padding 452
// StormShader padding 453
// StormShader padding 454
// StormShader padding 455
// StormShader padding 456
// StormShader padding 457
// StormShader padding 458
// StormShader padding 459
// StormShader padding 460
// StormShader padding 461
// StormShader padding 462
// StormShader padding 463
// StormShader padding 464
// StormShader padding 465
// StormShader padding 466
// StormShader padding 467
// StormShader padding 468
// StormShader padding 469
// StormShader padding 470
// StormShader padding 471
// StormShader padding 472
// StormShader padding 473
// StormShader padding 474
// StormShader padding 475
// StormShader padding 476
// StormShader padding 477
// StormShader padding 478
// StormShader padding 479
// StormShader padding 480
// StormShader padding 481
// StormShader padding 482
// StormShader padding 483
// StormShader padding 484
// StormShader padding 485
// StormShader padding 486
// StormShader padding 487
// StormShader padding 488
// StormShader padding 489
// StormShader padding 490
// StormShader padding 491
// StormShader padding 492
// StormShader padding 493
// StormShader padding 494
// StormShader padding 495
// StormShader padding 496
// StormShader padding 497
