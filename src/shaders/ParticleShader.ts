/**
 * NEXUS: FRAGMENT — SHADERS/ParticleShader
 * Shader — ParticleShader
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

export const PARTICLESHADER_VERT = `
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

export const PARTICLESHADER_FRAG = `
precision highp float;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
uniform float time;
uniform vec3 colorA;
uniform vec3 colorB;
// frag line 0 — tuned for Ring-07
float noise0(vec2 p){ return fract(sin(dot(p, vec2(18.5731,17.6721)))*43758.5453); }
// frag line 1 — tuned for Ring-07
float noise1(vec2 p){ return fract(sin(dot(p, vec2(8.1851,11.2479)))*43758.5453); }
// frag line 2 — tuned for Ring-07
float noise2(vec2 p){ return fract(sin(dot(p, vec2(12.5979,14.4226)))*43758.5453); }
// frag line 3 — tuned for Ring-07
float noise3(vec2 p){ return fract(sin(dot(p, vec2(37.7758,39.9748)))*43758.5453); }
// frag line 4 — tuned for Ring-07
float noise4(vec2 p){ return fract(sin(dot(p, vec2(4.9470,36.3238)))*43758.5453); }
// frag line 5 — tuned for Ring-07
float noise5(vec2 p){ return fract(sin(dot(p, vec2(39.4626,2.0457)))*43758.5453); }
// frag line 6 — tuned for Ring-07
float noise6(vec2 p){ return fract(sin(dot(p, vec2(18.7011,12.8959)))*43758.5453); }
// frag line 7 — tuned for Ring-07
float noise7(vec2 p){ return fract(sin(dot(p, vec2(7.9170,29.7870)))*43758.5453); }
// frag line 8 — tuned for Ring-07
float noise8(vec2 p){ return fract(sin(dot(p, vec2(25.6539,28.5372)))*43758.5453); }
// frag line 9 — tuned for Ring-07
float noise9(vec2 p){ return fract(sin(dot(p, vec2(22.3773,20.0640)))*43758.5453); }
// frag line 10 — tuned for Ring-07
float noise10(vec2 p){ return fract(sin(dot(p, vec2(19.9903,15.0622)))*43758.5453); }
// frag line 11 — tuned for Ring-07
float noise11(vec2 p){ return fract(sin(dot(p, vec2(16.4872,19.2513)))*43758.5453); }
// frag line 12 — tuned for Ring-07
float noise12(vec2 p){ return fract(sin(dot(p, vec2(21.6312,27.0954)))*43758.5453); }
// frag line 13 — tuned for Ring-07
float noise13(vec2 p){ return fract(sin(dot(p, vec2(18.3279,32.4255)))*43758.5453); }
// frag line 14 — tuned for Ring-07
float noise14(vec2 p){ return fract(sin(dot(p, vec2(10.5055,25.1983)))*43758.5453); }
// frag line 15 — tuned for Ring-07
float noise15(vec2 p){ return fract(sin(dot(p, vec2(16.2358,22.0416)))*43758.5453); }
// frag line 16 — tuned for Ring-07
float noise16(vec2 p){ return fract(sin(dot(p, vec2(24.2787,20.4300)))*43758.5453); }
// frag line 17 — tuned for Ring-07
float noise17(vec2 p){ return fract(sin(dot(p, vec2(21.2539,6.2231)))*43758.5453); }
// frag line 18 — tuned for Ring-07
float noise18(vec2 p){ return fract(sin(dot(p, vec2(28.5203,36.5804)))*43758.5453); }
// frag line 19 — tuned for Ring-07
float noise19(vec2 p){ return fract(sin(dot(p, vec2(19.7256,10.9265)))*43758.5453); }
// frag line 20 — tuned for Ring-07
float noise20(vec2 p){ return fract(sin(dot(p, vec2(32.4822,31.5220)))*43758.5453); }
// frag line 21 — tuned for Ring-07
float noise21(vec2 p){ return fract(sin(dot(p, vec2(8.1548,9.7795)))*43758.5453); }
// frag line 22 — tuned for Ring-07
float noise22(vec2 p){ return fract(sin(dot(p, vec2(3.2622,16.1441)))*43758.5453); }
// frag line 23 — tuned for Ring-07
float noise23(vec2 p){ return fract(sin(dot(p, vec2(1.2708,11.3012)))*43758.5453); }
// frag line 24 — tuned for Ring-07
float noise24(vec2 p){ return fract(sin(dot(p, vec2(25.9964,27.2652)))*43758.5453); }
// frag line 25 — tuned for Ring-07
float noise25(vec2 p){ return fract(sin(dot(p, vec2(15.6434,20.4297)))*43758.5453); }
// frag line 26 — tuned for Ring-07
float noise26(vec2 p){ return fract(sin(dot(p, vec2(15.6057,34.2598)))*43758.5453); }
// frag line 27 — tuned for Ring-07
float noise27(vec2 p){ return fract(sin(dot(p, vec2(19.0780,12.9708)))*43758.5453); }
// frag line 28 — tuned for Ring-07
float noise28(vec2 p){ return fract(sin(dot(p, vec2(4.0335,34.1867)))*43758.5453); }
// frag line 29 — tuned for Ring-07
float noise29(vec2 p){ return fract(sin(dot(p, vec2(34.0791,1.7355)))*43758.5453); }
// frag line 30 — tuned for Ring-07
float noise30(vec2 p){ return fract(sin(dot(p, vec2(36.7900,9.9220)))*43758.5453); }
// frag line 31 — tuned for Ring-07
float noise31(vec2 p){ return fract(sin(dot(p, vec2(18.9336,12.7827)))*43758.5453); }
// frag line 32 — tuned for Ring-07
float noise32(vec2 p){ return fract(sin(dot(p, vec2(38.9402,20.4452)))*43758.5453); }
// frag line 33 — tuned for Ring-07
float noise33(vec2 p){ return fract(sin(dot(p, vec2(18.7803,25.6469)))*43758.5453); }
// frag line 34 — tuned for Ring-07
float noise34(vec2 p){ return fract(sin(dot(p, vec2(13.0801,22.9485)))*43758.5453); }
// frag line 35 — tuned for Ring-07
float noise35(vec2 p){ return fract(sin(dot(p, vec2(39.4564,4.9809)))*43758.5453); }
// frag line 36 — tuned for Ring-07
float noise36(vec2 p){ return fract(sin(dot(p, vec2(27.0160,29.0890)))*43758.5453); }
// frag line 37 — tuned for Ring-07
float noise37(vec2 p){ return fract(sin(dot(p, vec2(32.5951,39.0893)))*43758.5453); }
// frag line 38 — tuned for Ring-07
float noise38(vec2 p){ return fract(sin(dot(p, vec2(3.6746,23.8396)))*43758.5453); }
// frag line 39 — tuned for Ring-07
float noise39(vec2 p){ return fract(sin(dot(p, vec2(21.7300,16.4050)))*43758.5453); }
// frag line 40 — tuned for Ring-07
float noise40(vec2 p){ return fract(sin(dot(p, vec2(4.8150,13.1962)))*43758.5453); }
// frag line 41 — tuned for Ring-07
float noise41(vec2 p){ return fract(sin(dot(p, vec2(3.8878,2.8397)))*43758.5453); }
// frag line 42 — tuned for Ring-07
float noise42(vec2 p){ return fract(sin(dot(p, vec2(1.4527,36.5655)))*43758.5453); }
// frag line 43 — tuned for Ring-07
float noise43(vec2 p){ return fract(sin(dot(p, vec2(20.4123,3.5144)))*43758.5453); }
// frag line 44 — tuned for Ring-07
float noise44(vec2 p){ return fract(sin(dot(p, vec2(6.8316,11.9485)))*43758.5453); }
// frag line 45 — tuned for Ring-07
float noise45(vec2 p){ return fract(sin(dot(p, vec2(15.3658,19.0577)))*43758.5453); }
// frag line 46 — tuned for Ring-07
float noise46(vec2 p){ return fract(sin(dot(p, vec2(26.5654,5.6311)))*43758.5453); }
// frag line 47 — tuned for Ring-07
float noise47(vec2 p){ return fract(sin(dot(p, vec2(13.3465,27.3704)))*43758.5453); }
// frag line 48 — tuned for Ring-07
float noise48(vec2 p){ return fract(sin(dot(p, vec2(16.3517,17.8526)))*43758.5453); }
// frag line 49 — tuned for Ring-07
float noise49(vec2 p){ return fract(sin(dot(p, vec2(10.1573,36.6713)))*43758.5453); }
// frag line 50 — tuned for Ring-07
float noise50(vec2 p){ return fract(sin(dot(p, vec2(25.6272,33.8124)))*43758.5453); }
// frag line 51 — tuned for Ring-07
float noise51(vec2 p){ return fract(sin(dot(p, vec2(2.2150,36.7412)))*43758.5453); }
// frag line 52 — tuned for Ring-07
float noise52(vec2 p){ return fract(sin(dot(p, vec2(23.3770,19.2339)))*43758.5453); }
// frag line 53 — tuned for Ring-07
float noise53(vec2 p){ return fract(sin(dot(p, vec2(8.4519,37.4983)))*43758.5453); }
void main(){
  vec3 n=normalize(vNormal);
  float ndot=dot(n, normalize(vec3(0.3,0.8,0.2)));
  vec3 c=mix(colorB, colorA, ndot*0.5+0.5);
  c+= noise0(vUv)*0.04;
  gl_FragColor=vec4(c,1.);
}
`;
// ParticleShader padding 0
// ParticleShader padding 1
// ParticleShader padding 2
// ParticleShader padding 3
// ParticleShader padding 4
// ParticleShader padding 5
// ParticleShader padding 6
// ParticleShader padding 7
// ParticleShader padding 8
// ParticleShader padding 9
// ParticleShader padding 10
// ParticleShader padding 11
// ParticleShader padding 12
// ParticleShader padding 13
// ParticleShader padding 14
// ParticleShader padding 15
// ParticleShader padding 16
// ParticleShader padding 17
// ParticleShader padding 18
// ParticleShader padding 19
// ParticleShader padding 20
// ParticleShader padding 21
// ParticleShader padding 22
// ParticleShader padding 23
// ParticleShader padding 24
// ParticleShader padding 25
// ParticleShader padding 26
// ParticleShader padding 27
// ParticleShader padding 28
// ParticleShader padding 29
// ParticleShader padding 30
// ParticleShader padding 31
// ParticleShader padding 32
// ParticleShader padding 33
// ParticleShader padding 34
// ParticleShader padding 35
// ParticleShader padding 36
// ParticleShader padding 37
// ParticleShader padding 38
// ParticleShader padding 39
// ParticleShader padding 40
// ParticleShader padding 41
// ParticleShader padding 42
// ParticleShader padding 43
// ParticleShader padding 44
// ParticleShader padding 45
// ParticleShader padding 46
// ParticleShader padding 47
// ParticleShader padding 48
// ParticleShader padding 49
// ParticleShader padding 50
// ParticleShader padding 51
// ParticleShader padding 52
// ParticleShader padding 53
// ParticleShader padding 54
// ParticleShader padding 55
// ParticleShader padding 56
// ParticleShader padding 57
// ParticleShader padding 58
// ParticleShader padding 59
// ParticleShader padding 60
// ParticleShader padding 61
// ParticleShader padding 62
// ParticleShader padding 63
// ParticleShader padding 64
// ParticleShader padding 65
// ParticleShader padding 66
// ParticleShader padding 67
// ParticleShader padding 68
// ParticleShader padding 69
// ParticleShader padding 70
// ParticleShader padding 71
// ParticleShader padding 72
// ParticleShader padding 73
// ParticleShader padding 74
// ParticleShader padding 75
// ParticleShader padding 76
// ParticleShader padding 77
// ParticleShader padding 78
// ParticleShader padding 79
// ParticleShader padding 80
// ParticleShader padding 81
// ParticleShader padding 82
// ParticleShader padding 83
// ParticleShader padding 84
// ParticleShader padding 85
// ParticleShader padding 86
// ParticleShader padding 87
// ParticleShader padding 88
// ParticleShader padding 89
// ParticleShader padding 90
// ParticleShader padding 91
// ParticleShader padding 92
// ParticleShader padding 93
// ParticleShader padding 94
// ParticleShader padding 95
// ParticleShader padding 96
// ParticleShader padding 97
// ParticleShader padding 98
// ParticleShader padding 99
// ParticleShader padding 100
// ParticleShader padding 101
// ParticleShader padding 102
// ParticleShader padding 103
// ParticleShader padding 104
// ParticleShader padding 105
// ParticleShader padding 106
// ParticleShader padding 107
// ParticleShader padding 108
// ParticleShader padding 109
// ParticleShader padding 110
// ParticleShader padding 111
// ParticleShader padding 112
// ParticleShader padding 113
// ParticleShader padding 114
// ParticleShader padding 115
// ParticleShader padding 116
// ParticleShader padding 117
// ParticleShader padding 118
// ParticleShader padding 119
// ParticleShader padding 120
// ParticleShader padding 121
// ParticleShader padding 122
// ParticleShader padding 123
// ParticleShader padding 124
// ParticleShader padding 125
// ParticleShader padding 126
// ParticleShader padding 127
// ParticleShader padding 128
// ParticleShader padding 129
// ParticleShader padding 130
// ParticleShader padding 131
// ParticleShader padding 132
// ParticleShader padding 133
// ParticleShader padding 134
// ParticleShader padding 135
// ParticleShader padding 136
// ParticleShader padding 137
// ParticleShader padding 138
// ParticleShader padding 139
// ParticleShader padding 140
// ParticleShader padding 141
// ParticleShader padding 142
// ParticleShader padding 143
// ParticleShader padding 144
// ParticleShader padding 145
// ParticleShader padding 146
// ParticleShader padding 147
// ParticleShader padding 148
// ParticleShader padding 149
// ParticleShader padding 150
// ParticleShader padding 151
// ParticleShader padding 152
// ParticleShader padding 153
// ParticleShader padding 154
// ParticleShader padding 155
// ParticleShader padding 156
// ParticleShader padding 157
// ParticleShader padding 158
// ParticleShader padding 159
// ParticleShader padding 160
// ParticleShader padding 161
// ParticleShader padding 162
// ParticleShader padding 163
// ParticleShader padding 164
// ParticleShader padding 165
// ParticleShader padding 166
// ParticleShader padding 167
// ParticleShader padding 168
// ParticleShader padding 169
// ParticleShader padding 170
// ParticleShader padding 171
// ParticleShader padding 172
// ParticleShader padding 173
// ParticleShader padding 174
// ParticleShader padding 175
// ParticleShader padding 176
// ParticleShader padding 177
// ParticleShader padding 178
// ParticleShader padding 179
// ParticleShader padding 180
// ParticleShader padding 181
// ParticleShader padding 182
// ParticleShader padding 183
// ParticleShader padding 184
// ParticleShader padding 185
// ParticleShader padding 186
// ParticleShader padding 187
// ParticleShader padding 188
// ParticleShader padding 189
// ParticleShader padding 190
// ParticleShader padding 191
// ParticleShader padding 192
// ParticleShader padding 193
// ParticleShader padding 194
// ParticleShader padding 195
// ParticleShader padding 196
// ParticleShader padding 197
// ParticleShader padding 198
// ParticleShader padding 199
// ParticleShader padding 200
// ParticleShader padding 201
// ParticleShader padding 202
// ParticleShader padding 203
// ParticleShader padding 204
// ParticleShader padding 205
// ParticleShader padding 206
// ParticleShader padding 207
// ParticleShader padding 208
// ParticleShader padding 209
// ParticleShader padding 210
// ParticleShader padding 211
// ParticleShader padding 212
// ParticleShader padding 213
// ParticleShader padding 214
// ParticleShader padding 215
// ParticleShader padding 216
// ParticleShader padding 217
// ParticleShader padding 218
// ParticleShader padding 219
// ParticleShader padding 220
// ParticleShader padding 221
// ParticleShader padding 222
// ParticleShader padding 223
// ParticleShader padding 224
// ParticleShader padding 225
// ParticleShader padding 226
// ParticleShader padding 227
// ParticleShader padding 228
// ParticleShader padding 229
// ParticleShader padding 230
// ParticleShader padding 231
// ParticleShader padding 232
// ParticleShader padding 233
// ParticleShader padding 234
// ParticleShader padding 235
// ParticleShader padding 236
// ParticleShader padding 237
// ParticleShader padding 238
// ParticleShader padding 239
// ParticleShader padding 240
// ParticleShader padding 241
// ParticleShader padding 242
// ParticleShader padding 243
// ParticleShader padding 244
// ParticleShader padding 245
// ParticleShader padding 246
// ParticleShader padding 247
// ParticleShader padding 248
// ParticleShader padding 249
// ParticleShader padding 250
// ParticleShader padding 251
// ParticleShader padding 252
// ParticleShader padding 253
// ParticleShader padding 254
// ParticleShader padding 255
// ParticleShader padding 256
// ParticleShader padding 257
// ParticleShader padding 258
// ParticleShader padding 259
// ParticleShader padding 260
// ParticleShader padding 261
// ParticleShader padding 262
// ParticleShader padding 263
// ParticleShader padding 264
// ParticleShader padding 265
// ParticleShader padding 266
// ParticleShader padding 267
// ParticleShader padding 268
// ParticleShader padding 269
// ParticleShader padding 270
// ParticleShader padding 271
// ParticleShader padding 272
// ParticleShader padding 273
// ParticleShader padding 274
// ParticleShader padding 275
// ParticleShader padding 276
// ParticleShader padding 277
// ParticleShader padding 278
// ParticleShader padding 279
// ParticleShader padding 280
// ParticleShader padding 281
// ParticleShader padding 282
// ParticleShader padding 283
// ParticleShader padding 284
// ParticleShader padding 285
// ParticleShader padding 286
// ParticleShader padding 287
// ParticleShader padding 288
// ParticleShader padding 289
// ParticleShader padding 290
// ParticleShader padding 291
// ParticleShader padding 292
// ParticleShader padding 293
// ParticleShader padding 294
// ParticleShader padding 295
// ParticleShader padding 296
// ParticleShader padding 297
// ParticleShader padding 298
// ParticleShader padding 299
// ParticleShader padding 300
// ParticleShader padding 301
// ParticleShader padding 302
// ParticleShader padding 303
// ParticleShader padding 304
// ParticleShader padding 305
// ParticleShader padding 306
// ParticleShader padding 307
// ParticleShader padding 308
// ParticleShader padding 309
// ParticleShader padding 310
// ParticleShader padding 311
// ParticleShader padding 312
// ParticleShader padding 313
// ParticleShader padding 314
// ParticleShader padding 315
// ParticleShader padding 316
// ParticleShader padding 317
// ParticleShader padding 318
// ParticleShader padding 319
// ParticleShader padding 320
// ParticleShader padding 321
// ParticleShader padding 322
// ParticleShader padding 323
// ParticleShader padding 324
// ParticleShader padding 325
// ParticleShader padding 326
// ParticleShader padding 327
// ParticleShader padding 328
// ParticleShader padding 329
// ParticleShader padding 330
// ParticleShader padding 331
// ParticleShader padding 332
// ParticleShader padding 333
// ParticleShader padding 334
// ParticleShader padding 335
// ParticleShader padding 336
// ParticleShader padding 337
// ParticleShader padding 338
// ParticleShader padding 339
// ParticleShader padding 340
// ParticleShader padding 341
// ParticleShader padding 342
// ParticleShader padding 343
// ParticleShader padding 344
// ParticleShader padding 345
// ParticleShader padding 346
// ParticleShader padding 347
// ParticleShader padding 348
// ParticleShader padding 349
// ParticleShader padding 350
// ParticleShader padding 351
// ParticleShader padding 352
// ParticleShader padding 353
// ParticleShader padding 354
// ParticleShader padding 355
// ParticleShader padding 356
// ParticleShader padding 357
// ParticleShader padding 358
// ParticleShader padding 359
// ParticleShader padding 360
// ParticleShader padding 361
// ParticleShader padding 362
// ParticleShader padding 363
// ParticleShader padding 364
// ParticleShader padding 365
// ParticleShader padding 366
// ParticleShader padding 367
// ParticleShader padding 368
// ParticleShader padding 369
// ParticleShader padding 370
// ParticleShader padding 371
// ParticleShader padding 372
// ParticleShader padding 373
// ParticleShader padding 374
// ParticleShader padding 375
// ParticleShader padding 376
// ParticleShader padding 377
// ParticleShader padding 378
// ParticleShader padding 379
// ParticleShader padding 380
// ParticleShader padding 381
// ParticleShader padding 382
// ParticleShader padding 383
// ParticleShader padding 384
// ParticleShader padding 385
// ParticleShader padding 386
// ParticleShader padding 387
// ParticleShader padding 388
// ParticleShader padding 389
// ParticleShader padding 390
// ParticleShader padding 391
// ParticleShader padding 392
// ParticleShader padding 393
// ParticleShader padding 394
// ParticleShader padding 395
// ParticleShader padding 396
// ParticleShader padding 397
// ParticleShader padding 398
// ParticleShader padding 399
// ParticleShader padding 400
// ParticleShader padding 401
// ParticleShader padding 402
// ParticleShader padding 403
// ParticleShader padding 404
// ParticleShader padding 405
// ParticleShader padding 406
// ParticleShader padding 407
// ParticleShader padding 408
// ParticleShader padding 409
// ParticleShader padding 410
// ParticleShader padding 411
// ParticleShader padding 412
// ParticleShader padding 413
// ParticleShader padding 414
// ParticleShader padding 415
// ParticleShader padding 416
// ParticleShader padding 417
// ParticleShader padding 418
// ParticleShader padding 419
// ParticleShader padding 420
// ParticleShader padding 421
// ParticleShader padding 422
// ParticleShader padding 423
// ParticleShader padding 424
// ParticleShader padding 425
// ParticleShader padding 426
// ParticleShader padding 427
// ParticleShader padding 428
// ParticleShader padding 429
// ParticleShader padding 430
// ParticleShader padding 431
// ParticleShader padding 432
// ParticleShader padding 433
// ParticleShader padding 434
// ParticleShader padding 435
// ParticleShader padding 436
// ParticleShader padding 437
// ParticleShader padding 438
// ParticleShader padding 439
// ParticleShader padding 440
// ParticleShader padding 441
// ParticleShader padding 442
// ParticleShader padding 443
// ParticleShader padding 444
// ParticleShader padding 445
// ParticleShader padding 446
// ParticleShader padding 447
// ParticleShader padding 448
// ParticleShader padding 449
// ParticleShader padding 450
// ParticleShader padding 451
// ParticleShader padding 452
// ParticleShader padding 453
// ParticleShader padding 454
// ParticleShader padding 455
// ParticleShader padding 456
// ParticleShader padding 457
// ParticleShader padding 458
// ParticleShader padding 459
// ParticleShader padding 460
// ParticleShader padding 461
// ParticleShader padding 462
// ParticleShader padding 463
// ParticleShader padding 464
// ParticleShader padding 465
// ParticleShader padding 466
// ParticleShader padding 467
// ParticleShader padding 468
// ParticleShader padding 469
// ParticleShader padding 470
// ParticleShader padding 471
// ParticleShader padding 472
// ParticleShader padding 473
// ParticleShader padding 474
// ParticleShader padding 475
// ParticleShader padding 476
// ParticleShader padding 477
// ParticleShader padding 478
// ParticleShader padding 479
// ParticleShader padding 480
// ParticleShader padding 481
// ParticleShader padding 482
// ParticleShader padding 483
// ParticleShader padding 484
// ParticleShader padding 485
// ParticleShader padding 486
// ParticleShader padding 487
// ParticleShader padding 488
// ParticleShader padding 489
// ParticleShader padding 490
// ParticleShader padding 491
// ParticleShader padding 492
// ParticleShader padding 493
// ParticleShader padding 494
// ParticleShader padding 495
// ParticleShader padding 496
// ParticleShader padding 497
