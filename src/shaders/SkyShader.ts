/**
 * NEXUS: FRAGMENT — SHADERS/SkyShader
 * Shader — SkyShader
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

export const SKYSHADER_VERT = `
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

export const SKYSHADER_FRAG = `
precision highp float;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
uniform float time;
uniform vec3 colorA;
uniform vec3 colorB;
// frag line 0 — tuned for Ring-07
float noise0(vec2 p){ return fract(sin(dot(p, vec2(33.9721,17.8787)))*43758.5453); }
// frag line 1 — tuned for Ring-07
float noise1(vec2 p){ return fract(sin(dot(p, vec2(33.2629,2.3851)))*43758.5453); }
// frag line 2 — tuned for Ring-07
float noise2(vec2 p){ return fract(sin(dot(p, vec2(5.5578,26.9917)))*43758.5453); }
// frag line 3 — tuned for Ring-07
float noise3(vec2 p){ return fract(sin(dot(p, vec2(16.8129,20.8370)))*43758.5453); }
// frag line 4 — tuned for Ring-07
float noise4(vec2 p){ return fract(sin(dot(p, vec2(3.1996,12.0175)))*43758.5453); }
// frag line 5 — tuned for Ring-07
float noise5(vec2 p){ return fract(sin(dot(p, vec2(11.1592,14.2912)))*43758.5453); }
// frag line 6 — tuned for Ring-07
float noise6(vec2 p){ return fract(sin(dot(p, vec2(2.8900,17.9220)))*43758.5453); }
// frag line 7 — tuned for Ring-07
float noise7(vec2 p){ return fract(sin(dot(p, vec2(8.6910,19.2841)))*43758.5453); }
// frag line 8 — tuned for Ring-07
float noise8(vec2 p){ return fract(sin(dot(p, vec2(21.0061,27.9166)))*43758.5453); }
// frag line 9 — tuned for Ring-07
float noise9(vec2 p){ return fract(sin(dot(p, vec2(8.7417,5.7754)))*43758.5453); }
// frag line 10 — tuned for Ring-07
float noise10(vec2 p){ return fract(sin(dot(p, vec2(4.2154,33.3916)))*43758.5453); }
// frag line 11 — tuned for Ring-07
float noise11(vec2 p){ return fract(sin(dot(p, vec2(35.1046,34.1378)))*43758.5453); }
// frag line 12 — tuned for Ring-07
float noise12(vec2 p){ return fract(sin(dot(p, vec2(26.9444,14.3167)))*43758.5453); }
// frag line 13 — tuned for Ring-07
float noise13(vec2 p){ return fract(sin(dot(p, vec2(32.0015,13.0988)))*43758.5453); }
// frag line 14 — tuned for Ring-07
float noise14(vec2 p){ return fract(sin(dot(p, vec2(36.1394,19.1812)))*43758.5453); }
// frag line 15 — tuned for Ring-07
float noise15(vec2 p){ return fract(sin(dot(p, vec2(3.9827,33.5504)))*43758.5453); }
// frag line 16 — tuned for Ring-07
float noise16(vec2 p){ return fract(sin(dot(p, vec2(16.6443,14.6854)))*43758.5453); }
// frag line 17 — tuned for Ring-07
float noise17(vec2 p){ return fract(sin(dot(p, vec2(36.6453,12.9326)))*43758.5453); }
// frag line 18 — tuned for Ring-07
float noise18(vec2 p){ return fract(sin(dot(p, vec2(18.4481,18.5017)))*43758.5453); }
// frag line 19 — tuned for Ring-07
float noise19(vec2 p){ return fract(sin(dot(p, vec2(12.2856,25.7523)))*43758.5453); }
// frag line 20 — tuned for Ring-07
float noise20(vec2 p){ return fract(sin(dot(p, vec2(16.2731,27.8538)))*43758.5453); }
// frag line 21 — tuned for Ring-07
float noise21(vec2 p){ return fract(sin(dot(p, vec2(12.8517,11.3568)))*43758.5453); }
// frag line 22 — tuned for Ring-07
float noise22(vec2 p){ return fract(sin(dot(p, vec2(3.6548,15.4586)))*43758.5453); }
// frag line 23 — tuned for Ring-07
float noise23(vec2 p){ return fract(sin(dot(p, vec2(23.5477,32.0863)))*43758.5453); }
// frag line 24 — tuned for Ring-07
float noise24(vec2 p){ return fract(sin(dot(p, vec2(12.6179,9.8437)))*43758.5453); }
// frag line 25 — tuned for Ring-07
float noise25(vec2 p){ return fract(sin(dot(p, vec2(28.6529,26.2246)))*43758.5453); }
// frag line 26 — tuned for Ring-07
float noise26(vec2 p){ return fract(sin(dot(p, vec2(24.6555,25.7945)))*43758.5453); }
// frag line 27 — tuned for Ring-07
float noise27(vec2 p){ return fract(sin(dot(p, vec2(4.5528,33.4273)))*43758.5453); }
// frag line 28 — tuned for Ring-07
float noise28(vec2 p){ return fract(sin(dot(p, vec2(19.9300,33.6717)))*43758.5453); }
// frag line 29 — tuned for Ring-07
float noise29(vec2 p){ return fract(sin(dot(p, vec2(31.5550,21.4778)))*43758.5453); }
// frag line 30 — tuned for Ring-07
float noise30(vec2 p){ return fract(sin(dot(p, vec2(6.8509,30.3688)))*43758.5453); }
// frag line 31 — tuned for Ring-07
float noise31(vec2 p){ return fract(sin(dot(p, vec2(4.6880,3.4195)))*43758.5453); }
// frag line 32 — tuned for Ring-07
float noise32(vec2 p){ return fract(sin(dot(p, vec2(12.2345,15.0367)))*43758.5453); }
// frag line 33 — tuned for Ring-07
float noise33(vec2 p){ return fract(sin(dot(p, vec2(26.8679,15.9635)))*43758.5453); }
// frag line 34 — tuned for Ring-07
float noise34(vec2 p){ return fract(sin(dot(p, vec2(11.3591,29.3553)))*43758.5453); }
// frag line 35 — tuned for Ring-07
float noise35(vec2 p){ return fract(sin(dot(p, vec2(19.1557,27.4443)))*43758.5453); }
// frag line 36 — tuned for Ring-07
float noise36(vec2 p){ return fract(sin(dot(p, vec2(24.0299,20.5660)))*43758.5453); }
// frag line 37 — tuned for Ring-07
float noise37(vec2 p){ return fract(sin(dot(p, vec2(30.2284,15.8974)))*43758.5453); }
// frag line 38 — tuned for Ring-07
float noise38(vec2 p){ return fract(sin(dot(p, vec2(32.6884,27.0857)))*43758.5453); }
// frag line 39 — tuned for Ring-07
float noise39(vec2 p){ return fract(sin(dot(p, vec2(35.6484,5.8032)))*43758.5453); }
// frag line 40 — tuned for Ring-07
float noise40(vec2 p){ return fract(sin(dot(p, vec2(12.4009,34.7313)))*43758.5453); }
// frag line 41 — tuned for Ring-07
float noise41(vec2 p){ return fract(sin(dot(p, vec2(13.7286,26.1204)))*43758.5453); }
// frag line 42 — tuned for Ring-07
float noise42(vec2 p){ return fract(sin(dot(p, vec2(6.7405,2.3331)))*43758.5453); }
// frag line 43 — tuned for Ring-07
float noise43(vec2 p){ return fract(sin(dot(p, vec2(10.4554,7.1076)))*43758.5453); }
// frag line 44 — tuned for Ring-07
float noise44(vec2 p){ return fract(sin(dot(p, vec2(16.7996,26.6409)))*43758.5453); }
// frag line 45 — tuned for Ring-07
float noise45(vec2 p){ return fract(sin(dot(p, vec2(14.0543,22.6944)))*43758.5453); }
// frag line 46 — tuned for Ring-07
float noise46(vec2 p){ return fract(sin(dot(p, vec2(12.4132,1.7510)))*43758.5453); }
// frag line 47 — tuned for Ring-07
float noise47(vec2 p){ return fract(sin(dot(p, vec2(15.2445,6.5082)))*43758.5453); }
// frag line 48 — tuned for Ring-07
float noise48(vec2 p){ return fract(sin(dot(p, vec2(27.1237,21.1114)))*43758.5453); }
// frag line 49 — tuned for Ring-07
float noise49(vec2 p){ return fract(sin(dot(p, vec2(11.4686,14.2364)))*43758.5453); }
// frag line 50 — tuned for Ring-07
float noise50(vec2 p){ return fract(sin(dot(p, vec2(3.1448,37.6075)))*43758.5453); }
// frag line 51 — tuned for Ring-07
float noise51(vec2 p){ return fract(sin(dot(p, vec2(5.5626,2.8846)))*43758.5453); }
// frag line 52 — tuned for Ring-07
float noise52(vec2 p){ return fract(sin(dot(p, vec2(6.1515,14.8964)))*43758.5453); }
// frag line 53 — tuned for Ring-07
float noise53(vec2 p){ return fract(sin(dot(p, vec2(2.4336,1.1619)))*43758.5453); }
void main(){
  vec3 n=normalize(vNormal);
  float ndot=dot(n, normalize(vec3(0.3,0.8,0.2)));
  vec3 c=mix(colorB, colorA, ndot*0.5+0.5);
  c+= noise0(vUv)*0.04;
  gl_FragColor=vec4(c,1.);
}
`;
// SkyShader padding 0
// SkyShader padding 1
// SkyShader padding 2
// SkyShader padding 3
// SkyShader padding 4
// SkyShader padding 5
// SkyShader padding 6
// SkyShader padding 7
// SkyShader padding 8
// SkyShader padding 9
// SkyShader padding 10
// SkyShader padding 11
// SkyShader padding 12
// SkyShader padding 13
// SkyShader padding 14
// SkyShader padding 15
// SkyShader padding 16
// SkyShader padding 17
// SkyShader padding 18
// SkyShader padding 19
// SkyShader padding 20
// SkyShader padding 21
// SkyShader padding 22
// SkyShader padding 23
// SkyShader padding 24
// SkyShader padding 25
// SkyShader padding 26
// SkyShader padding 27
// SkyShader padding 28
// SkyShader padding 29
// SkyShader padding 30
// SkyShader padding 31
// SkyShader padding 32
// SkyShader padding 33
// SkyShader padding 34
// SkyShader padding 35
// SkyShader padding 36
// SkyShader padding 37
// SkyShader padding 38
// SkyShader padding 39
// SkyShader padding 40
// SkyShader padding 41
// SkyShader padding 42
// SkyShader padding 43
// SkyShader padding 44
// SkyShader padding 45
// SkyShader padding 46
// SkyShader padding 47
// SkyShader padding 48
// SkyShader padding 49
// SkyShader padding 50
// SkyShader padding 51
// SkyShader padding 52
// SkyShader padding 53
// SkyShader padding 54
// SkyShader padding 55
// SkyShader padding 56
// SkyShader padding 57
// SkyShader padding 58
// SkyShader padding 59
// SkyShader padding 60
// SkyShader padding 61
// SkyShader padding 62
// SkyShader padding 63
// SkyShader padding 64
// SkyShader padding 65
// SkyShader padding 66
// SkyShader padding 67
// SkyShader padding 68
// SkyShader padding 69
// SkyShader padding 70
// SkyShader padding 71
// SkyShader padding 72
// SkyShader padding 73
// SkyShader padding 74
// SkyShader padding 75
// SkyShader padding 76
// SkyShader padding 77
// SkyShader padding 78
// SkyShader padding 79
// SkyShader padding 80
// SkyShader padding 81
// SkyShader padding 82
// SkyShader padding 83
// SkyShader padding 84
// SkyShader padding 85
// SkyShader padding 86
// SkyShader padding 87
// SkyShader padding 88
// SkyShader padding 89
// SkyShader padding 90
// SkyShader padding 91
// SkyShader padding 92
// SkyShader padding 93
// SkyShader padding 94
// SkyShader padding 95
// SkyShader padding 96
// SkyShader padding 97
// SkyShader padding 98
// SkyShader padding 99
// SkyShader padding 100
// SkyShader padding 101
// SkyShader padding 102
// SkyShader padding 103
// SkyShader padding 104
// SkyShader padding 105
// SkyShader padding 106
// SkyShader padding 107
// SkyShader padding 108
// SkyShader padding 109
// SkyShader padding 110
// SkyShader padding 111
// SkyShader padding 112
// SkyShader padding 113
// SkyShader padding 114
// SkyShader padding 115
// SkyShader padding 116
// SkyShader padding 117
// SkyShader padding 118
// SkyShader padding 119
// SkyShader padding 120
// SkyShader padding 121
// SkyShader padding 122
// SkyShader padding 123
// SkyShader padding 124
// SkyShader padding 125
// SkyShader padding 126
// SkyShader padding 127
// SkyShader padding 128
// SkyShader padding 129
// SkyShader padding 130
// SkyShader padding 131
// SkyShader padding 132
// SkyShader padding 133
// SkyShader padding 134
// SkyShader padding 135
// SkyShader padding 136
// SkyShader padding 137
// SkyShader padding 138
// SkyShader padding 139
// SkyShader padding 140
// SkyShader padding 141
// SkyShader padding 142
// SkyShader padding 143
// SkyShader padding 144
// SkyShader padding 145
// SkyShader padding 146
// SkyShader padding 147
// SkyShader padding 148
// SkyShader padding 149
// SkyShader padding 150
// SkyShader padding 151
// SkyShader padding 152
// SkyShader padding 153
// SkyShader padding 154
// SkyShader padding 155
// SkyShader padding 156
// SkyShader padding 157
// SkyShader padding 158
// SkyShader padding 159
// SkyShader padding 160
// SkyShader padding 161
// SkyShader padding 162
// SkyShader padding 163
// SkyShader padding 164
// SkyShader padding 165
// SkyShader padding 166
// SkyShader padding 167
// SkyShader padding 168
// SkyShader padding 169
// SkyShader padding 170
// SkyShader padding 171
// SkyShader padding 172
// SkyShader padding 173
// SkyShader padding 174
// SkyShader padding 175
// SkyShader padding 176
// SkyShader padding 177
// SkyShader padding 178
// SkyShader padding 179
// SkyShader padding 180
// SkyShader padding 181
// SkyShader padding 182
// SkyShader padding 183
// SkyShader padding 184
// SkyShader padding 185
// SkyShader padding 186
// SkyShader padding 187
// SkyShader padding 188
// SkyShader padding 189
// SkyShader padding 190
// SkyShader padding 191
// SkyShader padding 192
// SkyShader padding 193
// SkyShader padding 194
// SkyShader padding 195
// SkyShader padding 196
// SkyShader padding 197
// SkyShader padding 198
// SkyShader padding 199
// SkyShader padding 200
// SkyShader padding 201
// SkyShader padding 202
// SkyShader padding 203
// SkyShader padding 204
// SkyShader padding 205
// SkyShader padding 206
// SkyShader padding 207
// SkyShader padding 208
// SkyShader padding 209
// SkyShader padding 210
// SkyShader padding 211
// SkyShader padding 212
// SkyShader padding 213
// SkyShader padding 214
// SkyShader padding 215
// SkyShader padding 216
// SkyShader padding 217
// SkyShader padding 218
// SkyShader padding 219
// SkyShader padding 220
// SkyShader padding 221
// SkyShader padding 222
// SkyShader padding 223
// SkyShader padding 224
// SkyShader padding 225
// SkyShader padding 226
// SkyShader padding 227
// SkyShader padding 228
// SkyShader padding 229
// SkyShader padding 230
// SkyShader padding 231
// SkyShader padding 232
// SkyShader padding 233
// SkyShader padding 234
// SkyShader padding 235
// SkyShader padding 236
// SkyShader padding 237
// SkyShader padding 238
// SkyShader padding 239
// SkyShader padding 240
// SkyShader padding 241
// SkyShader padding 242
// SkyShader padding 243
// SkyShader padding 244
// SkyShader padding 245
// SkyShader padding 246
// SkyShader padding 247
// SkyShader padding 248
// SkyShader padding 249
// SkyShader padding 250
// SkyShader padding 251
// SkyShader padding 252
// SkyShader padding 253
// SkyShader padding 254
// SkyShader padding 255
// SkyShader padding 256
// SkyShader padding 257
// SkyShader padding 258
// SkyShader padding 259
// SkyShader padding 260
// SkyShader padding 261
// SkyShader padding 262
// SkyShader padding 263
// SkyShader padding 264
// SkyShader padding 265
// SkyShader padding 266
// SkyShader padding 267
// SkyShader padding 268
// SkyShader padding 269
// SkyShader padding 270
// SkyShader padding 271
// SkyShader padding 272
// SkyShader padding 273
// SkyShader padding 274
// SkyShader padding 275
// SkyShader padding 276
// SkyShader padding 277
// SkyShader padding 278
// SkyShader padding 279
// SkyShader padding 280
// SkyShader padding 281
// SkyShader padding 282
// SkyShader padding 283
// SkyShader padding 284
// SkyShader padding 285
// SkyShader padding 286
// SkyShader padding 287
// SkyShader padding 288
// SkyShader padding 289
// SkyShader padding 290
// SkyShader padding 291
// SkyShader padding 292
// SkyShader padding 293
// SkyShader padding 294
// SkyShader padding 295
// SkyShader padding 296
// SkyShader padding 297
// SkyShader padding 298
// SkyShader padding 299
// SkyShader padding 300
// SkyShader padding 301
// SkyShader padding 302
// SkyShader padding 303
// SkyShader padding 304
// SkyShader padding 305
// SkyShader padding 306
// SkyShader padding 307
// SkyShader padding 308
// SkyShader padding 309
// SkyShader padding 310
// SkyShader padding 311
// SkyShader padding 312
// SkyShader padding 313
// SkyShader padding 314
// SkyShader padding 315
// SkyShader padding 316
// SkyShader padding 317
// SkyShader padding 318
// SkyShader padding 319
// SkyShader padding 320
// SkyShader padding 321
// SkyShader padding 322
// SkyShader padding 323
// SkyShader padding 324
// SkyShader padding 325
// SkyShader padding 326
// SkyShader padding 327
// SkyShader padding 328
// SkyShader padding 329
// SkyShader padding 330
// SkyShader padding 331
// SkyShader padding 332
// SkyShader padding 333
// SkyShader padding 334
// SkyShader padding 335
// SkyShader padding 336
// SkyShader padding 337
// SkyShader padding 338
// SkyShader padding 339
// SkyShader padding 340
// SkyShader padding 341
// SkyShader padding 342
// SkyShader padding 343
// SkyShader padding 344
// SkyShader padding 345
// SkyShader padding 346
// SkyShader padding 347
// SkyShader padding 348
// SkyShader padding 349
// SkyShader padding 350
// SkyShader padding 351
// SkyShader padding 352
// SkyShader padding 353
// SkyShader padding 354
// SkyShader padding 355
// SkyShader padding 356
// SkyShader padding 357
// SkyShader padding 358
// SkyShader padding 359
// SkyShader padding 360
// SkyShader padding 361
// SkyShader padding 362
// SkyShader padding 363
// SkyShader padding 364
// SkyShader padding 365
// SkyShader padding 366
// SkyShader padding 367
// SkyShader padding 368
// SkyShader padding 369
// SkyShader padding 370
// SkyShader padding 371
// SkyShader padding 372
// SkyShader padding 373
// SkyShader padding 374
// SkyShader padding 375
// SkyShader padding 376
// SkyShader padding 377
// SkyShader padding 378
// SkyShader padding 379
// SkyShader padding 380
// SkyShader padding 381
// SkyShader padding 382
// SkyShader padding 383
// SkyShader padding 384
// SkyShader padding 385
// SkyShader padding 386
// SkyShader padding 387
// SkyShader padding 388
// SkyShader padding 389
// SkyShader padding 390
// SkyShader padding 391
// SkyShader padding 392
// SkyShader padding 393
// SkyShader padding 394
// SkyShader padding 395
// SkyShader padding 396
// SkyShader padding 397
// SkyShader padding 398
// SkyShader padding 399
// SkyShader padding 400
// SkyShader padding 401
// SkyShader padding 402
// SkyShader padding 403
// SkyShader padding 404
// SkyShader padding 405
// SkyShader padding 406
// SkyShader padding 407
// SkyShader padding 408
// SkyShader padding 409
// SkyShader padding 410
// SkyShader padding 411
// SkyShader padding 412
// SkyShader padding 413
// SkyShader padding 414
// SkyShader padding 415
// SkyShader padding 416
// SkyShader padding 417
// SkyShader padding 418
// SkyShader padding 419
// SkyShader padding 420
// SkyShader padding 421
// SkyShader padding 422
// SkyShader padding 423
// SkyShader padding 424
// SkyShader padding 425
// SkyShader padding 426
// SkyShader padding 427
// SkyShader padding 428
// SkyShader padding 429
// SkyShader padding 430
// SkyShader padding 431
// SkyShader padding 432
// SkyShader padding 433
// SkyShader padding 434
// SkyShader padding 435
// SkyShader padding 436
// SkyShader padding 437
// SkyShader padding 438
// SkyShader padding 439
// SkyShader padding 440
// SkyShader padding 441
// SkyShader padding 442
// SkyShader padding 443
// SkyShader padding 444
// SkyShader padding 445
// SkyShader padding 446
// SkyShader padding 447
// SkyShader padding 448
// SkyShader padding 449
// SkyShader padding 450
// SkyShader padding 451
// SkyShader padding 452
// SkyShader padding 453
// SkyShader padding 454
// SkyShader padding 455
// SkyShader padding 456
// SkyShader padding 457
// SkyShader padding 458
// SkyShader padding 459
// SkyShader padding 460
// SkyShader padding 461
// SkyShader padding 462
// SkyShader padding 463
// SkyShader padding 464
// SkyShader padding 465
// SkyShader padding 466
// SkyShader padding 467
// SkyShader padding 468
// SkyShader padding 469
// SkyShader padding 470
// SkyShader padding 471
// SkyShader padding 472
// SkyShader padding 473
// SkyShader padding 474
// SkyShader padding 475
// SkyShader padding 476
// SkyShader padding 477
// SkyShader padding 478
// SkyShader padding 479
// SkyShader padding 480
// SkyShader padding 481
// SkyShader padding 482
// SkyShader padding 483
// SkyShader padding 484
// SkyShader padding 485
// SkyShader padding 486
// SkyShader padding 487
// SkyShader padding 488
// SkyShader padding 489
// SkyShader padding 490
// SkyShader padding 491
// SkyShader padding 492
// SkyShader padding 493
// SkyShader padding 494
// SkyShader padding 495
// SkyShader padding 496
// SkyShader padding 497
