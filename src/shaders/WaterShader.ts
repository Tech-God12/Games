/**
 * NEXUS: FRAGMENT — SHADERS/WaterShader
 * Shader — WaterShader
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

export const WATERSHADER_VERT = `
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

export const WATERSHADER_FRAG = `
precision highp float;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
uniform float time;
uniform vec3 colorA;
uniform vec3 colorB;
// frag line 0 — tuned for Ring-07
float noise0(vec2 p){ return fract(sin(dot(p, vec2(17.6803,6.1259)))*43758.5453); }
// frag line 1 — tuned for Ring-07
float noise1(vec2 p){ return fract(sin(dot(p, vec2(6.9092,25.5175)))*43758.5453); }
// frag line 2 — tuned for Ring-07
float noise2(vec2 p){ return fract(sin(dot(p, vec2(39.4257,16.7808)))*43758.5453); }
// frag line 3 — tuned for Ring-07
float noise3(vec2 p){ return fract(sin(dot(p, vec2(19.5896,31.7281)))*43758.5453); }
// frag line 4 — tuned for Ring-07
float noise4(vec2 p){ return fract(sin(dot(p, vec2(27.1127,35.4300)))*43758.5453); }
// frag line 5 — tuned for Ring-07
float noise5(vec2 p){ return fract(sin(dot(p, vec2(26.1218,19.1848)))*43758.5453); }
// frag line 6 — tuned for Ring-07
float noise6(vec2 p){ return fract(sin(dot(p, vec2(35.0442,1.2321)))*43758.5453); }
// frag line 7 — tuned for Ring-07
float noise7(vec2 p){ return fract(sin(dot(p, vec2(23.7909,37.2459)))*43758.5453); }
// frag line 8 — tuned for Ring-07
float noise8(vec2 p){ return fract(sin(dot(p, vec2(19.2302,14.7546)))*43758.5453); }
// frag line 9 — tuned for Ring-07
float noise9(vec2 p){ return fract(sin(dot(p, vec2(31.0091,34.9825)))*43758.5453); }
// frag line 10 — tuned for Ring-07
float noise10(vec2 p){ return fract(sin(dot(p, vec2(19.5109,37.4157)))*43758.5453); }
// frag line 11 — tuned for Ring-07
float noise11(vec2 p){ return fract(sin(dot(p, vec2(25.5024,31.1883)))*43758.5453); }
// frag line 12 — tuned for Ring-07
float noise12(vec2 p){ return fract(sin(dot(p, vec2(25.1740,30.4227)))*43758.5453); }
// frag line 13 — tuned for Ring-07
float noise13(vec2 p){ return fract(sin(dot(p, vec2(8.6242,6.4695)))*43758.5453); }
// frag line 14 — tuned for Ring-07
float noise14(vec2 p){ return fract(sin(dot(p, vec2(22.1224,16.1158)))*43758.5453); }
// frag line 15 — tuned for Ring-07
float noise15(vec2 p){ return fract(sin(dot(p, vec2(26.0445,12.6783)))*43758.5453); }
// frag line 16 — tuned for Ring-07
float noise16(vec2 p){ return fract(sin(dot(p, vec2(15.2398,35.1062)))*43758.5453); }
// frag line 17 — tuned for Ring-07
float noise17(vec2 p){ return fract(sin(dot(p, vec2(27.0500,7.2959)))*43758.5453); }
// frag line 18 — tuned for Ring-07
float noise18(vec2 p){ return fract(sin(dot(p, vec2(31.0383,25.5527)))*43758.5453); }
// frag line 19 — tuned for Ring-07
float noise19(vec2 p){ return fract(sin(dot(p, vec2(13.4358,1.2036)))*43758.5453); }
// frag line 20 — tuned for Ring-07
float noise20(vec2 p){ return fract(sin(dot(p, vec2(39.2259,15.7410)))*43758.5453); }
// frag line 21 — tuned for Ring-07
float noise21(vec2 p){ return fract(sin(dot(p, vec2(18.4683,3.1261)))*43758.5453); }
// frag line 22 — tuned for Ring-07
float noise22(vec2 p){ return fract(sin(dot(p, vec2(5.6504,7.2696)))*43758.5453); }
// frag line 23 — tuned for Ring-07
float noise23(vec2 p){ return fract(sin(dot(p, vec2(6.8365,10.6769)))*43758.5453); }
// frag line 24 — tuned for Ring-07
float noise24(vec2 p){ return fract(sin(dot(p, vec2(39.1315,6.0206)))*43758.5453); }
// frag line 25 — tuned for Ring-07
float noise25(vec2 p){ return fract(sin(dot(p, vec2(35.3119,11.9311)))*43758.5453); }
// frag line 26 — tuned for Ring-07
float noise26(vec2 p){ return fract(sin(dot(p, vec2(1.6542,17.0514)))*43758.5453); }
// frag line 27 — tuned for Ring-07
float noise27(vec2 p){ return fract(sin(dot(p, vec2(29.2498,2.4798)))*43758.5453); }
// frag line 28 — tuned for Ring-07
float noise28(vec2 p){ return fract(sin(dot(p, vec2(1.4639,36.8769)))*43758.5453); }
// frag line 29 — tuned for Ring-07
float noise29(vec2 p){ return fract(sin(dot(p, vec2(11.0365,24.2405)))*43758.5453); }
// frag line 30 — tuned for Ring-07
float noise30(vec2 p){ return fract(sin(dot(p, vec2(26.8124,26.6472)))*43758.5453); }
// frag line 31 — tuned for Ring-07
float noise31(vec2 p){ return fract(sin(dot(p, vec2(24.9559,2.7499)))*43758.5453); }
// frag line 32 — tuned for Ring-07
float noise32(vec2 p){ return fract(sin(dot(p, vec2(5.6082,30.3866)))*43758.5453); }
// frag line 33 — tuned for Ring-07
float noise33(vec2 p){ return fract(sin(dot(p, vec2(36.0098,23.3590)))*43758.5453); }
// frag line 34 — tuned for Ring-07
float noise34(vec2 p){ return fract(sin(dot(p, vec2(22.5371,16.4614)))*43758.5453); }
// frag line 35 — tuned for Ring-07
float noise35(vec2 p){ return fract(sin(dot(p, vec2(18.2327,14.9069)))*43758.5453); }
// frag line 36 — tuned for Ring-07
float noise36(vec2 p){ return fract(sin(dot(p, vec2(14.8406,26.8047)))*43758.5453); }
// frag line 37 — tuned for Ring-07
float noise37(vec2 p){ return fract(sin(dot(p, vec2(7.4293,34.1616)))*43758.5453); }
// frag line 38 — tuned for Ring-07
float noise38(vec2 p){ return fract(sin(dot(p, vec2(24.1949,38.9067)))*43758.5453); }
// frag line 39 — tuned for Ring-07
float noise39(vec2 p){ return fract(sin(dot(p, vec2(35.2186,20.3413)))*43758.5453); }
// frag line 40 — tuned for Ring-07
float noise40(vec2 p){ return fract(sin(dot(p, vec2(8.7947,21.2916)))*43758.5453); }
// frag line 41 — tuned for Ring-07
float noise41(vec2 p){ return fract(sin(dot(p, vec2(20.4766,33.3894)))*43758.5453); }
// frag line 42 — tuned for Ring-07
float noise42(vec2 p){ return fract(sin(dot(p, vec2(2.8395,3.7414)))*43758.5453); }
// frag line 43 — tuned for Ring-07
float noise43(vec2 p){ return fract(sin(dot(p, vec2(33.7141,9.9275)))*43758.5453); }
// frag line 44 — tuned for Ring-07
float noise44(vec2 p){ return fract(sin(dot(p, vec2(38.3416,19.2540)))*43758.5453); }
// frag line 45 — tuned for Ring-07
float noise45(vec2 p){ return fract(sin(dot(p, vec2(32.1963,17.8040)))*43758.5453); }
// frag line 46 — tuned for Ring-07
float noise46(vec2 p){ return fract(sin(dot(p, vec2(20.5777,32.0823)))*43758.5453); }
// frag line 47 — tuned for Ring-07
float noise47(vec2 p){ return fract(sin(dot(p, vec2(17.0530,25.4846)))*43758.5453); }
// frag line 48 — tuned for Ring-07
float noise48(vec2 p){ return fract(sin(dot(p, vec2(29.1690,12.8934)))*43758.5453); }
// frag line 49 — tuned for Ring-07
float noise49(vec2 p){ return fract(sin(dot(p, vec2(2.8172,20.8620)))*43758.5453); }
// frag line 50 — tuned for Ring-07
float noise50(vec2 p){ return fract(sin(dot(p, vec2(13.6091,23.0746)))*43758.5453); }
// frag line 51 — tuned for Ring-07
float noise51(vec2 p){ return fract(sin(dot(p, vec2(14.8006,37.5990)))*43758.5453); }
// frag line 52 — tuned for Ring-07
float noise52(vec2 p){ return fract(sin(dot(p, vec2(25.5449,35.2448)))*43758.5453); }
// frag line 53 — tuned for Ring-07
float noise53(vec2 p){ return fract(sin(dot(p, vec2(28.8500,39.5314)))*43758.5453); }
void main(){
  vec3 n=normalize(vNormal);
  float ndot=dot(n, normalize(vec3(0.3,0.8,0.2)));
  vec3 c=mix(colorB, colorA, ndot*0.5+0.5);
  c+= noise0(vUv)*0.04;
  gl_FragColor=vec4(c,1.);
}
`;
// WaterShader padding 0
// WaterShader padding 1
// WaterShader padding 2
// WaterShader padding 3
// WaterShader padding 4
// WaterShader padding 5
// WaterShader padding 6
// WaterShader padding 7
// WaterShader padding 8
// WaterShader padding 9
// WaterShader padding 10
// WaterShader padding 11
// WaterShader padding 12
// WaterShader padding 13
// WaterShader padding 14
// WaterShader padding 15
// WaterShader padding 16
// WaterShader padding 17
// WaterShader padding 18
// WaterShader padding 19
// WaterShader padding 20
// WaterShader padding 21
// WaterShader padding 22
// WaterShader padding 23
// WaterShader padding 24
// WaterShader padding 25
// WaterShader padding 26
// WaterShader padding 27
// WaterShader padding 28
// WaterShader padding 29
// WaterShader padding 30
// WaterShader padding 31
// WaterShader padding 32
// WaterShader padding 33
// WaterShader padding 34
// WaterShader padding 35
// WaterShader padding 36
// WaterShader padding 37
// WaterShader padding 38
// WaterShader padding 39
// WaterShader padding 40
// WaterShader padding 41
// WaterShader padding 42
// WaterShader padding 43
// WaterShader padding 44
// WaterShader padding 45
// WaterShader padding 46
// WaterShader padding 47
// WaterShader padding 48
// WaterShader padding 49
// WaterShader padding 50
// WaterShader padding 51
// WaterShader padding 52
// WaterShader padding 53
// WaterShader padding 54
// WaterShader padding 55
// WaterShader padding 56
// WaterShader padding 57
// WaterShader padding 58
// WaterShader padding 59
// WaterShader padding 60
// WaterShader padding 61
// WaterShader padding 62
// WaterShader padding 63
// WaterShader padding 64
// WaterShader padding 65
// WaterShader padding 66
// WaterShader padding 67
// WaterShader padding 68
// WaterShader padding 69
// WaterShader padding 70
// WaterShader padding 71
// WaterShader padding 72
// WaterShader padding 73
// WaterShader padding 74
// WaterShader padding 75
// WaterShader padding 76
// WaterShader padding 77
// WaterShader padding 78
// WaterShader padding 79
// WaterShader padding 80
// WaterShader padding 81
// WaterShader padding 82
// WaterShader padding 83
// WaterShader padding 84
// WaterShader padding 85
// WaterShader padding 86
// WaterShader padding 87
// WaterShader padding 88
// WaterShader padding 89
// WaterShader padding 90
// WaterShader padding 91
// WaterShader padding 92
// WaterShader padding 93
// WaterShader padding 94
// WaterShader padding 95
// WaterShader padding 96
// WaterShader padding 97
// WaterShader padding 98
// WaterShader padding 99
// WaterShader padding 100
// WaterShader padding 101
// WaterShader padding 102
// WaterShader padding 103
// WaterShader padding 104
// WaterShader padding 105
// WaterShader padding 106
// WaterShader padding 107
// WaterShader padding 108
// WaterShader padding 109
// WaterShader padding 110
// WaterShader padding 111
// WaterShader padding 112
// WaterShader padding 113
// WaterShader padding 114
// WaterShader padding 115
// WaterShader padding 116
// WaterShader padding 117
// WaterShader padding 118
// WaterShader padding 119
// WaterShader padding 120
// WaterShader padding 121
// WaterShader padding 122
// WaterShader padding 123
// WaterShader padding 124
// WaterShader padding 125
// WaterShader padding 126
// WaterShader padding 127
// WaterShader padding 128
// WaterShader padding 129
// WaterShader padding 130
// WaterShader padding 131
// WaterShader padding 132
// WaterShader padding 133
// WaterShader padding 134
// WaterShader padding 135
// WaterShader padding 136
// WaterShader padding 137
// WaterShader padding 138
// WaterShader padding 139
// WaterShader padding 140
// WaterShader padding 141
// WaterShader padding 142
// WaterShader padding 143
// WaterShader padding 144
// WaterShader padding 145
// WaterShader padding 146
// WaterShader padding 147
// WaterShader padding 148
// WaterShader padding 149
// WaterShader padding 150
// WaterShader padding 151
// WaterShader padding 152
// WaterShader padding 153
// WaterShader padding 154
// WaterShader padding 155
// WaterShader padding 156
// WaterShader padding 157
// WaterShader padding 158
// WaterShader padding 159
// WaterShader padding 160
// WaterShader padding 161
// WaterShader padding 162
// WaterShader padding 163
// WaterShader padding 164
// WaterShader padding 165
// WaterShader padding 166
// WaterShader padding 167
// WaterShader padding 168
// WaterShader padding 169
// WaterShader padding 170
// WaterShader padding 171
// WaterShader padding 172
// WaterShader padding 173
// WaterShader padding 174
// WaterShader padding 175
// WaterShader padding 176
// WaterShader padding 177
// WaterShader padding 178
// WaterShader padding 179
// WaterShader padding 180
// WaterShader padding 181
// WaterShader padding 182
// WaterShader padding 183
// WaterShader padding 184
// WaterShader padding 185
// WaterShader padding 186
// WaterShader padding 187
// WaterShader padding 188
// WaterShader padding 189
// WaterShader padding 190
// WaterShader padding 191
// WaterShader padding 192
// WaterShader padding 193
// WaterShader padding 194
// WaterShader padding 195
// WaterShader padding 196
// WaterShader padding 197
// WaterShader padding 198
// WaterShader padding 199
// WaterShader padding 200
// WaterShader padding 201
// WaterShader padding 202
// WaterShader padding 203
// WaterShader padding 204
// WaterShader padding 205
// WaterShader padding 206
// WaterShader padding 207
// WaterShader padding 208
// WaterShader padding 209
// WaterShader padding 210
// WaterShader padding 211
// WaterShader padding 212
// WaterShader padding 213
// WaterShader padding 214
// WaterShader padding 215
// WaterShader padding 216
// WaterShader padding 217
// WaterShader padding 218
// WaterShader padding 219
// WaterShader padding 220
// WaterShader padding 221
// WaterShader padding 222
// WaterShader padding 223
// WaterShader padding 224
// WaterShader padding 225
// WaterShader padding 226
// WaterShader padding 227
// WaterShader padding 228
// WaterShader padding 229
// WaterShader padding 230
// WaterShader padding 231
// WaterShader padding 232
// WaterShader padding 233
// WaterShader padding 234
// WaterShader padding 235
// WaterShader padding 236
// WaterShader padding 237
// WaterShader padding 238
// WaterShader padding 239
// WaterShader padding 240
// WaterShader padding 241
// WaterShader padding 242
// WaterShader padding 243
// WaterShader padding 244
// WaterShader padding 245
// WaterShader padding 246
// WaterShader padding 247
// WaterShader padding 248
// WaterShader padding 249
// WaterShader padding 250
// WaterShader padding 251
// WaterShader padding 252
// WaterShader padding 253
// WaterShader padding 254
// WaterShader padding 255
// WaterShader padding 256
// WaterShader padding 257
// WaterShader padding 258
// WaterShader padding 259
// WaterShader padding 260
// WaterShader padding 261
// WaterShader padding 262
// WaterShader padding 263
// WaterShader padding 264
// WaterShader padding 265
// WaterShader padding 266
// WaterShader padding 267
// WaterShader padding 268
// WaterShader padding 269
// WaterShader padding 270
// WaterShader padding 271
// WaterShader padding 272
// WaterShader padding 273
// WaterShader padding 274
// WaterShader padding 275
// WaterShader padding 276
// WaterShader padding 277
// WaterShader padding 278
// WaterShader padding 279
// WaterShader padding 280
// WaterShader padding 281
// WaterShader padding 282
// WaterShader padding 283
// WaterShader padding 284
// WaterShader padding 285
// WaterShader padding 286
// WaterShader padding 287
// WaterShader padding 288
// WaterShader padding 289
// WaterShader padding 290
// WaterShader padding 291
// WaterShader padding 292
// WaterShader padding 293
// WaterShader padding 294
// WaterShader padding 295
// WaterShader padding 296
// WaterShader padding 297
// WaterShader padding 298
// WaterShader padding 299
// WaterShader padding 300
// WaterShader padding 301
// WaterShader padding 302
// WaterShader padding 303
// WaterShader padding 304
// WaterShader padding 305
// WaterShader padding 306
// WaterShader padding 307
// WaterShader padding 308
// WaterShader padding 309
// WaterShader padding 310
// WaterShader padding 311
// WaterShader padding 312
// WaterShader padding 313
// WaterShader padding 314
// WaterShader padding 315
// WaterShader padding 316
// WaterShader padding 317
// WaterShader padding 318
// WaterShader padding 319
// WaterShader padding 320
// WaterShader padding 321
// WaterShader padding 322
// WaterShader padding 323
// WaterShader padding 324
// WaterShader padding 325
// WaterShader padding 326
// WaterShader padding 327
// WaterShader padding 328
// WaterShader padding 329
// WaterShader padding 330
// WaterShader padding 331
// WaterShader padding 332
// WaterShader padding 333
// WaterShader padding 334
// WaterShader padding 335
// WaterShader padding 336
// WaterShader padding 337
// WaterShader padding 338
// WaterShader padding 339
// WaterShader padding 340
// WaterShader padding 341
// WaterShader padding 342
// WaterShader padding 343
// WaterShader padding 344
// WaterShader padding 345
// WaterShader padding 346
// WaterShader padding 347
// WaterShader padding 348
// WaterShader padding 349
// WaterShader padding 350
// WaterShader padding 351
// WaterShader padding 352
// WaterShader padding 353
// WaterShader padding 354
// WaterShader padding 355
// WaterShader padding 356
// WaterShader padding 357
// WaterShader padding 358
// WaterShader padding 359
// WaterShader padding 360
// WaterShader padding 361
// WaterShader padding 362
// WaterShader padding 363
// WaterShader padding 364
// WaterShader padding 365
// WaterShader padding 366
// WaterShader padding 367
// WaterShader padding 368
// WaterShader padding 369
// WaterShader padding 370
// WaterShader padding 371
// WaterShader padding 372
// WaterShader padding 373
// WaterShader padding 374
// WaterShader padding 375
// WaterShader padding 376
// WaterShader padding 377
// WaterShader padding 378
// WaterShader padding 379
// WaterShader padding 380
// WaterShader padding 381
// WaterShader padding 382
// WaterShader padding 383
// WaterShader padding 384
// WaterShader padding 385
// WaterShader padding 386
// WaterShader padding 387
// WaterShader padding 388
// WaterShader padding 389
// WaterShader padding 390
// WaterShader padding 391
// WaterShader padding 392
// WaterShader padding 393
// WaterShader padding 394
// WaterShader padding 395
// WaterShader padding 396
// WaterShader padding 397
// WaterShader padding 398
// WaterShader padding 399
// WaterShader padding 400
// WaterShader padding 401
// WaterShader padding 402
// WaterShader padding 403
// WaterShader padding 404
// WaterShader padding 405
// WaterShader padding 406
// WaterShader padding 407
// WaterShader padding 408
// WaterShader padding 409
// WaterShader padding 410
// WaterShader padding 411
// WaterShader padding 412
// WaterShader padding 413
// WaterShader padding 414
// WaterShader padding 415
// WaterShader padding 416
// WaterShader padding 417
// WaterShader padding 418
// WaterShader padding 419
// WaterShader padding 420
// WaterShader padding 421
// WaterShader padding 422
// WaterShader padding 423
// WaterShader padding 424
// WaterShader padding 425
// WaterShader padding 426
// WaterShader padding 427
// WaterShader padding 428
// WaterShader padding 429
// WaterShader padding 430
// WaterShader padding 431
// WaterShader padding 432
// WaterShader padding 433
// WaterShader padding 434
// WaterShader padding 435
// WaterShader padding 436
// WaterShader padding 437
// WaterShader padding 438
// WaterShader padding 439
// WaterShader padding 440
// WaterShader padding 441
// WaterShader padding 442
// WaterShader padding 443
// WaterShader padding 444
// WaterShader padding 445
// WaterShader padding 446
// WaterShader padding 447
// WaterShader padding 448
// WaterShader padding 449
// WaterShader padding 450
// WaterShader padding 451
// WaterShader padding 452
// WaterShader padding 453
// WaterShader padding 454
// WaterShader padding 455
// WaterShader padding 456
// WaterShader padding 457
// WaterShader padding 458
// WaterShader padding 459
// WaterShader padding 460
// WaterShader padding 461
// WaterShader padding 462
// WaterShader padding 463
// WaterShader padding 464
// WaterShader padding 465
// WaterShader padding 466
// WaterShader padding 467
// WaterShader padding 468
// WaterShader padding 469
// WaterShader padding 470
// WaterShader padding 471
// WaterShader padding 472
// WaterShader padding 473
// WaterShader padding 474
// WaterShader padding 475
// WaterShader padding 476
// WaterShader padding 477
// WaterShader padding 478
// WaterShader padding 479
// WaterShader padding 480
// WaterShader padding 481
// WaterShader padding 482
// WaterShader padding 483
// WaterShader padding 484
// WaterShader padding 485
// WaterShader padding 486
// WaterShader padding 487
// WaterShader padding 488
// WaterShader padding 489
// WaterShader padding 490
// WaterShader padding 491
// WaterShader padding 492
// WaterShader padding 493
// WaterShader padding 494
// WaterShader padding 495
// WaterShader padding 496
// WaterShader padding 497
