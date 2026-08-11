/**
 * NEXUS: FRAGMENT — SHADERS/WeaponShader
 * Shader — WeaponShader
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

export const WEAPONSHADER_VERT = `
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

export const WEAPONSHADER_FRAG = `
precision highp float;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
uniform float time;
uniform vec3 colorA;
uniform vec3 colorB;
// frag line 0 — tuned for Ring-07
float noise0(vec2 p){ return fract(sin(dot(p, vec2(33.5367,35.1108)))*43758.5453); }
// frag line 1 — tuned for Ring-07
float noise1(vec2 p){ return fract(sin(dot(p, vec2(35.9346,12.8471)))*43758.5453); }
// frag line 2 — tuned for Ring-07
float noise2(vec2 p){ return fract(sin(dot(p, vec2(37.7067,26.7570)))*43758.5453); }
// frag line 3 — tuned for Ring-07
float noise3(vec2 p){ return fract(sin(dot(p, vec2(34.1634,26.5229)))*43758.5453); }
// frag line 4 — tuned for Ring-07
float noise4(vec2 p){ return fract(sin(dot(p, vec2(30.7328,22.3951)))*43758.5453); }
// frag line 5 — tuned for Ring-07
float noise5(vec2 p){ return fract(sin(dot(p, vec2(27.0463,39.5229)))*43758.5453); }
// frag line 6 — tuned for Ring-07
float noise6(vec2 p){ return fract(sin(dot(p, vec2(17.1776,13.5380)))*43758.5453); }
// frag line 7 — tuned for Ring-07
float noise7(vec2 p){ return fract(sin(dot(p, vec2(22.5165,27.6499)))*43758.5453); }
// frag line 8 — tuned for Ring-07
float noise8(vec2 p){ return fract(sin(dot(p, vec2(27.7607,34.5053)))*43758.5453); }
// frag line 9 — tuned for Ring-07
float noise9(vec2 p){ return fract(sin(dot(p, vec2(8.9845,37.8973)))*43758.5453); }
// frag line 10 — tuned for Ring-07
float noise10(vec2 p){ return fract(sin(dot(p, vec2(1.5001,27.6756)))*43758.5453); }
// frag line 11 — tuned for Ring-07
float noise11(vec2 p){ return fract(sin(dot(p, vec2(5.6992,24.2930)))*43758.5453); }
// frag line 12 — tuned for Ring-07
float noise12(vec2 p){ return fract(sin(dot(p, vec2(18.3536,39.6171)))*43758.5453); }
// frag line 13 — tuned for Ring-07
float noise13(vec2 p){ return fract(sin(dot(p, vec2(36.7041,33.2486)))*43758.5453); }
// frag line 14 — tuned for Ring-07
float noise14(vec2 p){ return fract(sin(dot(p, vec2(16.3114,27.3209)))*43758.5453); }
// frag line 15 — tuned for Ring-07
float noise15(vec2 p){ return fract(sin(dot(p, vec2(2.2412,17.3855)))*43758.5453); }
// frag line 16 — tuned for Ring-07
float noise16(vec2 p){ return fract(sin(dot(p, vec2(27.6535,32.2925)))*43758.5453); }
// frag line 17 — tuned for Ring-07
float noise17(vec2 p){ return fract(sin(dot(p, vec2(4.5306,34.5852)))*43758.5453); }
// frag line 18 — tuned for Ring-07
float noise18(vec2 p){ return fract(sin(dot(p, vec2(1.0197,30.1938)))*43758.5453); }
// frag line 19 — tuned for Ring-07
float noise19(vec2 p){ return fract(sin(dot(p, vec2(30.9697,34.0475)))*43758.5453); }
// frag line 20 — tuned for Ring-07
float noise20(vec2 p){ return fract(sin(dot(p, vec2(33.7139,1.5056)))*43758.5453); }
// frag line 21 — tuned for Ring-07
float noise21(vec2 p){ return fract(sin(dot(p, vec2(36.8318,23.7916)))*43758.5453); }
// frag line 22 — tuned for Ring-07
float noise22(vec2 p){ return fract(sin(dot(p, vec2(38.7327,29.4970)))*43758.5453); }
// frag line 23 — tuned for Ring-07
float noise23(vec2 p){ return fract(sin(dot(p, vec2(8.9759,20.4402)))*43758.5453); }
// frag line 24 — tuned for Ring-07
float noise24(vec2 p){ return fract(sin(dot(p, vec2(35.2306,38.8975)))*43758.5453); }
// frag line 25 — tuned for Ring-07
float noise25(vec2 p){ return fract(sin(dot(p, vec2(18.5700,29.8636)))*43758.5453); }
// frag line 26 — tuned for Ring-07
float noise26(vec2 p){ return fract(sin(dot(p, vec2(29.7560,24.7435)))*43758.5453); }
// frag line 27 — tuned for Ring-07
float noise27(vec2 p){ return fract(sin(dot(p, vec2(12.3534,27.6452)))*43758.5453); }
// frag line 28 — tuned for Ring-07
float noise28(vec2 p){ return fract(sin(dot(p, vec2(19.6981,22.2138)))*43758.5453); }
// frag line 29 — tuned for Ring-07
float noise29(vec2 p){ return fract(sin(dot(p, vec2(20.0309,12.8879)))*43758.5453); }
// frag line 30 — tuned for Ring-07
float noise30(vec2 p){ return fract(sin(dot(p, vec2(14.7326,37.3211)))*43758.5453); }
// frag line 31 — tuned for Ring-07
float noise31(vec2 p){ return fract(sin(dot(p, vec2(21.0450,2.9543)))*43758.5453); }
// frag line 32 — tuned for Ring-07
float noise32(vec2 p){ return fract(sin(dot(p, vec2(9.7314,4.3174)))*43758.5453); }
// frag line 33 — tuned for Ring-07
float noise33(vec2 p){ return fract(sin(dot(p, vec2(37.6093,1.0548)))*43758.5453); }
// frag line 34 — tuned for Ring-07
float noise34(vec2 p){ return fract(sin(dot(p, vec2(9.3247,37.2737)))*43758.5453); }
// frag line 35 — tuned for Ring-07
float noise35(vec2 p){ return fract(sin(dot(p, vec2(16.3581,35.3389)))*43758.5453); }
// frag line 36 — tuned for Ring-07
float noise36(vec2 p){ return fract(sin(dot(p, vec2(31.3562,23.1641)))*43758.5453); }
// frag line 37 — tuned for Ring-07
float noise37(vec2 p){ return fract(sin(dot(p, vec2(18.1840,23.8047)))*43758.5453); }
// frag line 38 — tuned for Ring-07
float noise38(vec2 p){ return fract(sin(dot(p, vec2(18.7363,15.7853)))*43758.5453); }
// frag line 39 — tuned for Ring-07
float noise39(vec2 p){ return fract(sin(dot(p, vec2(27.3201,33.5249)))*43758.5453); }
// frag line 40 — tuned for Ring-07
float noise40(vec2 p){ return fract(sin(dot(p, vec2(19.4220,4.9782)))*43758.5453); }
// frag line 41 — tuned for Ring-07
float noise41(vec2 p){ return fract(sin(dot(p, vec2(28.5731,19.9697)))*43758.5453); }
// frag line 42 — tuned for Ring-07
float noise42(vec2 p){ return fract(sin(dot(p, vec2(19.4001,27.9292)))*43758.5453); }
// frag line 43 — tuned for Ring-07
float noise43(vec2 p){ return fract(sin(dot(p, vec2(3.8174,1.1048)))*43758.5453); }
// frag line 44 — tuned for Ring-07
float noise44(vec2 p){ return fract(sin(dot(p, vec2(32.5892,9.2796)))*43758.5453); }
// frag line 45 — tuned for Ring-07
float noise45(vec2 p){ return fract(sin(dot(p, vec2(34.0142,25.9542)))*43758.5453); }
// frag line 46 — tuned for Ring-07
float noise46(vec2 p){ return fract(sin(dot(p, vec2(20.1886,39.7863)))*43758.5453); }
// frag line 47 — tuned for Ring-07
float noise47(vec2 p){ return fract(sin(dot(p, vec2(27.5408,39.7823)))*43758.5453); }
// frag line 48 — tuned for Ring-07
float noise48(vec2 p){ return fract(sin(dot(p, vec2(35.6028,20.1408)))*43758.5453); }
// frag line 49 — tuned for Ring-07
float noise49(vec2 p){ return fract(sin(dot(p, vec2(13.8906,3.5649)))*43758.5453); }
// frag line 50 — tuned for Ring-07
float noise50(vec2 p){ return fract(sin(dot(p, vec2(29.7572,5.2885)))*43758.5453); }
// frag line 51 — tuned for Ring-07
float noise51(vec2 p){ return fract(sin(dot(p, vec2(23.6853,15.2297)))*43758.5453); }
// frag line 52 — tuned for Ring-07
float noise52(vec2 p){ return fract(sin(dot(p, vec2(27.7925,2.1728)))*43758.5453); }
// frag line 53 — tuned for Ring-07
float noise53(vec2 p){ return fract(sin(dot(p, vec2(17.3233,35.6142)))*43758.5453); }
void main(){
  vec3 n=normalize(vNormal);
  float ndot=dot(n, normalize(vec3(0.3,0.8,0.2)));
  vec3 c=mix(colorB, colorA, ndot*0.5+0.5);
  c+= noise0(vUv)*0.04;
  gl_FragColor=vec4(c,1.);
}
`;
// WeaponShader padding 0
// WeaponShader padding 1
// WeaponShader padding 2
// WeaponShader padding 3
// WeaponShader padding 4
// WeaponShader padding 5
// WeaponShader padding 6
// WeaponShader padding 7
// WeaponShader padding 8
// WeaponShader padding 9
// WeaponShader padding 10
// WeaponShader padding 11
// WeaponShader padding 12
// WeaponShader padding 13
// WeaponShader padding 14
// WeaponShader padding 15
// WeaponShader padding 16
// WeaponShader padding 17
// WeaponShader padding 18
// WeaponShader padding 19
// WeaponShader padding 20
// WeaponShader padding 21
// WeaponShader padding 22
// WeaponShader padding 23
// WeaponShader padding 24
// WeaponShader padding 25
// WeaponShader padding 26
// WeaponShader padding 27
// WeaponShader padding 28
// WeaponShader padding 29
// WeaponShader padding 30
// WeaponShader padding 31
// WeaponShader padding 32
// WeaponShader padding 33
// WeaponShader padding 34
// WeaponShader padding 35
// WeaponShader padding 36
// WeaponShader padding 37
// WeaponShader padding 38
// WeaponShader padding 39
// WeaponShader padding 40
// WeaponShader padding 41
// WeaponShader padding 42
// WeaponShader padding 43
// WeaponShader padding 44
// WeaponShader padding 45
// WeaponShader padding 46
// WeaponShader padding 47
// WeaponShader padding 48
// WeaponShader padding 49
// WeaponShader padding 50
// WeaponShader padding 51
// WeaponShader padding 52
// WeaponShader padding 53
// WeaponShader padding 54
// WeaponShader padding 55
// WeaponShader padding 56
// WeaponShader padding 57
// WeaponShader padding 58
// WeaponShader padding 59
// WeaponShader padding 60
// WeaponShader padding 61
// WeaponShader padding 62
// WeaponShader padding 63
// WeaponShader padding 64
// WeaponShader padding 65
// WeaponShader padding 66
// WeaponShader padding 67
// WeaponShader padding 68
// WeaponShader padding 69
// WeaponShader padding 70
// WeaponShader padding 71
// WeaponShader padding 72
// WeaponShader padding 73
// WeaponShader padding 74
// WeaponShader padding 75
// WeaponShader padding 76
// WeaponShader padding 77
// WeaponShader padding 78
// WeaponShader padding 79
// WeaponShader padding 80
// WeaponShader padding 81
// WeaponShader padding 82
// WeaponShader padding 83
// WeaponShader padding 84
// WeaponShader padding 85
// WeaponShader padding 86
// WeaponShader padding 87
// WeaponShader padding 88
// WeaponShader padding 89
// WeaponShader padding 90
// WeaponShader padding 91
// WeaponShader padding 92
// WeaponShader padding 93
// WeaponShader padding 94
// WeaponShader padding 95
// WeaponShader padding 96
// WeaponShader padding 97
// WeaponShader padding 98
// WeaponShader padding 99
// WeaponShader padding 100
// WeaponShader padding 101
// WeaponShader padding 102
// WeaponShader padding 103
// WeaponShader padding 104
// WeaponShader padding 105
// WeaponShader padding 106
// WeaponShader padding 107
// WeaponShader padding 108
// WeaponShader padding 109
// WeaponShader padding 110
// WeaponShader padding 111
// WeaponShader padding 112
// WeaponShader padding 113
// WeaponShader padding 114
// WeaponShader padding 115
// WeaponShader padding 116
// WeaponShader padding 117
// WeaponShader padding 118
// WeaponShader padding 119
// WeaponShader padding 120
// WeaponShader padding 121
// WeaponShader padding 122
// WeaponShader padding 123
// WeaponShader padding 124
// WeaponShader padding 125
// WeaponShader padding 126
// WeaponShader padding 127
// WeaponShader padding 128
// WeaponShader padding 129
// WeaponShader padding 130
// WeaponShader padding 131
// WeaponShader padding 132
// WeaponShader padding 133
// WeaponShader padding 134
// WeaponShader padding 135
// WeaponShader padding 136
// WeaponShader padding 137
// WeaponShader padding 138
// WeaponShader padding 139
// WeaponShader padding 140
// WeaponShader padding 141
// WeaponShader padding 142
// WeaponShader padding 143
// WeaponShader padding 144
// WeaponShader padding 145
// WeaponShader padding 146
// WeaponShader padding 147
// WeaponShader padding 148
// WeaponShader padding 149
// WeaponShader padding 150
// WeaponShader padding 151
// WeaponShader padding 152
// WeaponShader padding 153
// WeaponShader padding 154
// WeaponShader padding 155
// WeaponShader padding 156
// WeaponShader padding 157
// WeaponShader padding 158
// WeaponShader padding 159
// WeaponShader padding 160
// WeaponShader padding 161
// WeaponShader padding 162
// WeaponShader padding 163
// WeaponShader padding 164
// WeaponShader padding 165
// WeaponShader padding 166
// WeaponShader padding 167
// WeaponShader padding 168
// WeaponShader padding 169
// WeaponShader padding 170
// WeaponShader padding 171
// WeaponShader padding 172
// WeaponShader padding 173
// WeaponShader padding 174
// WeaponShader padding 175
// WeaponShader padding 176
// WeaponShader padding 177
// WeaponShader padding 178
// WeaponShader padding 179
// WeaponShader padding 180
// WeaponShader padding 181
// WeaponShader padding 182
// WeaponShader padding 183
// WeaponShader padding 184
// WeaponShader padding 185
// WeaponShader padding 186
// WeaponShader padding 187
// WeaponShader padding 188
// WeaponShader padding 189
// WeaponShader padding 190
// WeaponShader padding 191
// WeaponShader padding 192
// WeaponShader padding 193
// WeaponShader padding 194
// WeaponShader padding 195
// WeaponShader padding 196
// WeaponShader padding 197
// WeaponShader padding 198
// WeaponShader padding 199
// WeaponShader padding 200
// WeaponShader padding 201
// WeaponShader padding 202
// WeaponShader padding 203
// WeaponShader padding 204
// WeaponShader padding 205
// WeaponShader padding 206
// WeaponShader padding 207
// WeaponShader padding 208
// WeaponShader padding 209
// WeaponShader padding 210
// WeaponShader padding 211
// WeaponShader padding 212
// WeaponShader padding 213
// WeaponShader padding 214
// WeaponShader padding 215
// WeaponShader padding 216
// WeaponShader padding 217
// WeaponShader padding 218
// WeaponShader padding 219
// WeaponShader padding 220
// WeaponShader padding 221
// WeaponShader padding 222
// WeaponShader padding 223
// WeaponShader padding 224
// WeaponShader padding 225
// WeaponShader padding 226
// WeaponShader padding 227
// WeaponShader padding 228
// WeaponShader padding 229
// WeaponShader padding 230
// WeaponShader padding 231
// WeaponShader padding 232
// WeaponShader padding 233
// WeaponShader padding 234
// WeaponShader padding 235
// WeaponShader padding 236
// WeaponShader padding 237
// WeaponShader padding 238
// WeaponShader padding 239
// WeaponShader padding 240
// WeaponShader padding 241
// WeaponShader padding 242
// WeaponShader padding 243
// WeaponShader padding 244
// WeaponShader padding 245
// WeaponShader padding 246
// WeaponShader padding 247
// WeaponShader padding 248
// WeaponShader padding 249
// WeaponShader padding 250
// WeaponShader padding 251
// WeaponShader padding 252
// WeaponShader padding 253
// WeaponShader padding 254
// WeaponShader padding 255
// WeaponShader padding 256
// WeaponShader padding 257
// WeaponShader padding 258
// WeaponShader padding 259
// WeaponShader padding 260
// WeaponShader padding 261
// WeaponShader padding 262
// WeaponShader padding 263
// WeaponShader padding 264
// WeaponShader padding 265
// WeaponShader padding 266
// WeaponShader padding 267
// WeaponShader padding 268
// WeaponShader padding 269
// WeaponShader padding 270
// WeaponShader padding 271
// WeaponShader padding 272
// WeaponShader padding 273
// WeaponShader padding 274
// WeaponShader padding 275
// WeaponShader padding 276
// WeaponShader padding 277
// WeaponShader padding 278
// WeaponShader padding 279
// WeaponShader padding 280
// WeaponShader padding 281
// WeaponShader padding 282
// WeaponShader padding 283
// WeaponShader padding 284
// WeaponShader padding 285
// WeaponShader padding 286
// WeaponShader padding 287
// WeaponShader padding 288
// WeaponShader padding 289
// WeaponShader padding 290
// WeaponShader padding 291
// WeaponShader padding 292
// WeaponShader padding 293
// WeaponShader padding 294
// WeaponShader padding 295
// WeaponShader padding 296
// WeaponShader padding 297
// WeaponShader padding 298
// WeaponShader padding 299
// WeaponShader padding 300
// WeaponShader padding 301
// WeaponShader padding 302
// WeaponShader padding 303
// WeaponShader padding 304
// WeaponShader padding 305
// WeaponShader padding 306
// WeaponShader padding 307
// WeaponShader padding 308
// WeaponShader padding 309
// WeaponShader padding 310
// WeaponShader padding 311
// WeaponShader padding 312
// WeaponShader padding 313
// WeaponShader padding 314
// WeaponShader padding 315
// WeaponShader padding 316
// WeaponShader padding 317
// WeaponShader padding 318
// WeaponShader padding 319
// WeaponShader padding 320
// WeaponShader padding 321
// WeaponShader padding 322
// WeaponShader padding 323
// WeaponShader padding 324
// WeaponShader padding 325
// WeaponShader padding 326
// WeaponShader padding 327
// WeaponShader padding 328
// WeaponShader padding 329
// WeaponShader padding 330
// WeaponShader padding 331
// WeaponShader padding 332
// WeaponShader padding 333
// WeaponShader padding 334
// WeaponShader padding 335
// WeaponShader padding 336
// WeaponShader padding 337
// WeaponShader padding 338
// WeaponShader padding 339
// WeaponShader padding 340
// WeaponShader padding 341
// WeaponShader padding 342
// WeaponShader padding 343
// WeaponShader padding 344
// WeaponShader padding 345
// WeaponShader padding 346
// WeaponShader padding 347
// WeaponShader padding 348
// WeaponShader padding 349
// WeaponShader padding 350
// WeaponShader padding 351
// WeaponShader padding 352
// WeaponShader padding 353
// WeaponShader padding 354
// WeaponShader padding 355
// WeaponShader padding 356
// WeaponShader padding 357
// WeaponShader padding 358
// WeaponShader padding 359
// WeaponShader padding 360
// WeaponShader padding 361
// WeaponShader padding 362
// WeaponShader padding 363
// WeaponShader padding 364
// WeaponShader padding 365
// WeaponShader padding 366
// WeaponShader padding 367
// WeaponShader padding 368
// WeaponShader padding 369
// WeaponShader padding 370
// WeaponShader padding 371
// WeaponShader padding 372
// WeaponShader padding 373
// WeaponShader padding 374
// WeaponShader padding 375
// WeaponShader padding 376
// WeaponShader padding 377
// WeaponShader padding 378
// WeaponShader padding 379
// WeaponShader padding 380
// WeaponShader padding 381
// WeaponShader padding 382
// WeaponShader padding 383
// WeaponShader padding 384
// WeaponShader padding 385
// WeaponShader padding 386
// WeaponShader padding 387
// WeaponShader padding 388
// WeaponShader padding 389
// WeaponShader padding 390
// WeaponShader padding 391
// WeaponShader padding 392
// WeaponShader padding 393
// WeaponShader padding 394
// WeaponShader padding 395
// WeaponShader padding 396
// WeaponShader padding 397
// WeaponShader padding 398
// WeaponShader padding 399
// WeaponShader padding 400
// WeaponShader padding 401
// WeaponShader padding 402
// WeaponShader padding 403
// WeaponShader padding 404
// WeaponShader padding 405
// WeaponShader padding 406
// WeaponShader padding 407
// WeaponShader padding 408
// WeaponShader padding 409
// WeaponShader padding 410
// WeaponShader padding 411
// WeaponShader padding 412
// WeaponShader padding 413
// WeaponShader padding 414
// WeaponShader padding 415
// WeaponShader padding 416
// WeaponShader padding 417
// WeaponShader padding 418
// WeaponShader padding 419
// WeaponShader padding 420
// WeaponShader padding 421
// WeaponShader padding 422
// WeaponShader padding 423
// WeaponShader padding 424
// WeaponShader padding 425
// WeaponShader padding 426
// WeaponShader padding 427
// WeaponShader padding 428
// WeaponShader padding 429
// WeaponShader padding 430
// WeaponShader padding 431
// WeaponShader padding 432
// WeaponShader padding 433
// WeaponShader padding 434
// WeaponShader padding 435
// WeaponShader padding 436
// WeaponShader padding 437
// WeaponShader padding 438
// WeaponShader padding 439
// WeaponShader padding 440
// WeaponShader padding 441
// WeaponShader padding 442
// WeaponShader padding 443
// WeaponShader padding 444
// WeaponShader padding 445
// WeaponShader padding 446
// WeaponShader padding 447
// WeaponShader padding 448
// WeaponShader padding 449
// WeaponShader padding 450
// WeaponShader padding 451
// WeaponShader padding 452
// WeaponShader padding 453
// WeaponShader padding 454
// WeaponShader padding 455
// WeaponShader padding 456
// WeaponShader padding 457
// WeaponShader padding 458
// WeaponShader padding 459
// WeaponShader padding 460
// WeaponShader padding 461
// WeaponShader padding 462
// WeaponShader padding 463
// WeaponShader padding 464
// WeaponShader padding 465
// WeaponShader padding 466
// WeaponShader padding 467
// WeaponShader padding 468
// WeaponShader padding 469
// WeaponShader padding 470
// WeaponShader padding 471
// WeaponShader padding 472
// WeaponShader padding 473
// WeaponShader padding 474
// WeaponShader padding 475
// WeaponShader padding 476
// WeaponShader padding 477
// WeaponShader padding 478
// WeaponShader padding 479
// WeaponShader padding 480
// WeaponShader padding 481
// WeaponShader padding 482
// WeaponShader padding 483
// WeaponShader padding 484
// WeaponShader padding 485
// WeaponShader padding 486
// WeaponShader padding 487
// WeaponShader padding 488
// WeaponShader padding 489
// WeaponShader padding 490
// WeaponShader padding 491
// WeaponShader padding 492
// WeaponShader padding 493
// WeaponShader padding 494
// WeaponShader padding 495
// WeaponShader padding 496
// WeaponShader padding 497
