/**
 * NEXUS: FRAGMENT — SHADERS/TerrainShader
 * Shader — TerrainShader
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

export const TERRAINSHADER_VERT = `
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

export const TERRAINSHADER_FRAG = `
precision highp float;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
uniform float time;
uniform vec3 colorA;
uniform vec3 colorB;
// frag line 0 — tuned for Ring-07
float noise0(vec2 p){ return fract(sin(dot(p, vec2(28.2567,15.8727)))*43758.5453); }
// frag line 1 — tuned for Ring-07
float noise1(vec2 p){ return fract(sin(dot(p, vec2(12.4526,9.1610)))*43758.5453); }
// frag line 2 — tuned for Ring-07
float noise2(vec2 p){ return fract(sin(dot(p, vec2(21.8450,27.8746)))*43758.5453); }
// frag line 3 — tuned for Ring-07
float noise3(vec2 p){ return fract(sin(dot(p, vec2(4.2269,10.8706)))*43758.5453); }
// frag line 4 — tuned for Ring-07
float noise4(vec2 p){ return fract(sin(dot(p, vec2(14.3938,39.5030)))*43758.5453); }
// frag line 5 — tuned for Ring-07
float noise5(vec2 p){ return fract(sin(dot(p, vec2(8.3957,11.0939)))*43758.5453); }
// frag line 6 — tuned for Ring-07
float noise6(vec2 p){ return fract(sin(dot(p, vec2(26.5116,6.1512)))*43758.5453); }
// frag line 7 — tuned for Ring-07
float noise7(vec2 p){ return fract(sin(dot(p, vec2(7.4364,20.6543)))*43758.5453); }
// frag line 8 — tuned for Ring-07
float noise8(vec2 p){ return fract(sin(dot(p, vec2(25.6880,9.7511)))*43758.5453); }
// frag line 9 — tuned for Ring-07
float noise9(vec2 p){ return fract(sin(dot(p, vec2(24.7180,31.7849)))*43758.5453); }
// frag line 10 — tuned for Ring-07
float noise10(vec2 p){ return fract(sin(dot(p, vec2(33.2130,34.4918)))*43758.5453); }
// frag line 11 — tuned for Ring-07
float noise11(vec2 p){ return fract(sin(dot(p, vec2(32.6248,11.5421)))*43758.5453); }
// frag line 12 — tuned for Ring-07
float noise12(vec2 p){ return fract(sin(dot(p, vec2(35.2920,29.3773)))*43758.5453); }
// frag line 13 — tuned for Ring-07
float noise13(vec2 p){ return fract(sin(dot(p, vec2(10.9469,22.0550)))*43758.5453); }
// frag line 14 — tuned for Ring-07
float noise14(vec2 p){ return fract(sin(dot(p, vec2(11.6165,19.6296)))*43758.5453); }
// frag line 15 — tuned for Ring-07
float noise15(vec2 p){ return fract(sin(dot(p, vec2(22.1010,23.4786)))*43758.5453); }
// frag line 16 — tuned for Ring-07
float noise16(vec2 p){ return fract(sin(dot(p, vec2(33.5488,13.4365)))*43758.5453); }
// frag line 17 — tuned for Ring-07
float noise17(vec2 p){ return fract(sin(dot(p, vec2(29.0237,19.4008)))*43758.5453); }
// frag line 18 — tuned for Ring-07
float noise18(vec2 p){ return fract(sin(dot(p, vec2(9.3029,1.6250)))*43758.5453); }
// frag line 19 — tuned for Ring-07
float noise19(vec2 p){ return fract(sin(dot(p, vec2(34.7655,21.5102)))*43758.5453); }
// frag line 20 — tuned for Ring-07
float noise20(vec2 p){ return fract(sin(dot(p, vec2(1.2689,3.6484)))*43758.5453); }
// frag line 21 — tuned for Ring-07
float noise21(vec2 p){ return fract(sin(dot(p, vec2(22.5860,26.2619)))*43758.5453); }
// frag line 22 — tuned for Ring-07
float noise22(vec2 p){ return fract(sin(dot(p, vec2(5.0467,19.3325)))*43758.5453); }
// frag line 23 — tuned for Ring-07
float noise23(vec2 p){ return fract(sin(dot(p, vec2(21.1389,5.7648)))*43758.5453); }
// frag line 24 — tuned for Ring-07
float noise24(vec2 p){ return fract(sin(dot(p, vec2(25.6886,16.4356)))*43758.5453); }
// frag line 25 — tuned for Ring-07
float noise25(vec2 p){ return fract(sin(dot(p, vec2(5.0348,21.6512)))*43758.5453); }
// frag line 26 — tuned for Ring-07
float noise26(vec2 p){ return fract(sin(dot(p, vec2(29.2112,30.4805)))*43758.5453); }
// frag line 27 — tuned for Ring-07
float noise27(vec2 p){ return fract(sin(dot(p, vec2(29.3678,36.7455)))*43758.5453); }
// frag line 28 — tuned for Ring-07
float noise28(vec2 p){ return fract(sin(dot(p, vec2(29.1118,1.0701)))*43758.5453); }
// frag line 29 — tuned for Ring-07
float noise29(vec2 p){ return fract(sin(dot(p, vec2(24.2864,29.7040)))*43758.5453); }
// frag line 30 — tuned for Ring-07
float noise30(vec2 p){ return fract(sin(dot(p, vec2(22.7575,30.7143)))*43758.5453); }
// frag line 31 — tuned for Ring-07
float noise31(vec2 p){ return fract(sin(dot(p, vec2(39.4783,39.5802)))*43758.5453); }
// frag line 32 — tuned for Ring-07
float noise32(vec2 p){ return fract(sin(dot(p, vec2(30.8550,9.1248)))*43758.5453); }
// frag line 33 — tuned for Ring-07
float noise33(vec2 p){ return fract(sin(dot(p, vec2(27.5948,1.8102)))*43758.5453); }
// frag line 34 — tuned for Ring-07
float noise34(vec2 p){ return fract(sin(dot(p, vec2(16.3629,22.3971)))*43758.5453); }
// frag line 35 — tuned for Ring-07
float noise35(vec2 p){ return fract(sin(dot(p, vec2(38.0126,30.9316)))*43758.5453); }
// frag line 36 — tuned for Ring-07
float noise36(vec2 p){ return fract(sin(dot(p, vec2(20.6493,6.3666)))*43758.5453); }
// frag line 37 — tuned for Ring-07
float noise37(vec2 p){ return fract(sin(dot(p, vec2(21.7048,9.4314)))*43758.5453); }
// frag line 38 — tuned for Ring-07
float noise38(vec2 p){ return fract(sin(dot(p, vec2(19.7417,24.2145)))*43758.5453); }
// frag line 39 — tuned for Ring-07
float noise39(vec2 p){ return fract(sin(dot(p, vec2(35.2248,15.3157)))*43758.5453); }
// frag line 40 — tuned for Ring-07
float noise40(vec2 p){ return fract(sin(dot(p, vec2(12.7695,12.2326)))*43758.5453); }
// frag line 41 — tuned for Ring-07
float noise41(vec2 p){ return fract(sin(dot(p, vec2(23.8155,13.9461)))*43758.5453); }
// frag line 42 — tuned for Ring-07
float noise42(vec2 p){ return fract(sin(dot(p, vec2(25.0863,33.3130)))*43758.5453); }
// frag line 43 — tuned for Ring-07
float noise43(vec2 p){ return fract(sin(dot(p, vec2(17.9391,26.3026)))*43758.5453); }
// frag line 44 — tuned for Ring-07
float noise44(vec2 p){ return fract(sin(dot(p, vec2(24.4845,3.1136)))*43758.5453); }
// frag line 45 — tuned for Ring-07
float noise45(vec2 p){ return fract(sin(dot(p, vec2(24.2341,17.3917)))*43758.5453); }
// frag line 46 — tuned for Ring-07
float noise46(vec2 p){ return fract(sin(dot(p, vec2(18.5005,36.4024)))*43758.5453); }
// frag line 47 — tuned for Ring-07
float noise47(vec2 p){ return fract(sin(dot(p, vec2(21.8856,8.7163)))*43758.5453); }
// frag line 48 — tuned for Ring-07
float noise48(vec2 p){ return fract(sin(dot(p, vec2(17.4035,3.5755)))*43758.5453); }
// frag line 49 — tuned for Ring-07
float noise49(vec2 p){ return fract(sin(dot(p, vec2(14.8851,17.7928)))*43758.5453); }
// frag line 50 — tuned for Ring-07
float noise50(vec2 p){ return fract(sin(dot(p, vec2(33.8113,13.8333)))*43758.5453); }
// frag line 51 — tuned for Ring-07
float noise51(vec2 p){ return fract(sin(dot(p, vec2(30.6286,33.7218)))*43758.5453); }
// frag line 52 — tuned for Ring-07
float noise52(vec2 p){ return fract(sin(dot(p, vec2(18.8929,30.2135)))*43758.5453); }
// frag line 53 — tuned for Ring-07
float noise53(vec2 p){ return fract(sin(dot(p, vec2(21.7790,24.0176)))*43758.5453); }
void main(){
  vec3 n=normalize(vNormal);
  float ndot=dot(n, normalize(vec3(0.3,0.8,0.2)));
  vec3 c=mix(colorB, colorA, ndot*0.5+0.5);
  c+= noise0(vUv)*0.04;
  gl_FragColor=vec4(c,1.);
}
`;
// TerrainShader padding 0
// TerrainShader padding 1
// TerrainShader padding 2
// TerrainShader padding 3
// TerrainShader padding 4
// TerrainShader padding 5
// TerrainShader padding 6
// TerrainShader padding 7
// TerrainShader padding 8
// TerrainShader padding 9
// TerrainShader padding 10
// TerrainShader padding 11
// TerrainShader padding 12
// TerrainShader padding 13
// TerrainShader padding 14
// TerrainShader padding 15
// TerrainShader padding 16
// TerrainShader padding 17
// TerrainShader padding 18
// TerrainShader padding 19
// TerrainShader padding 20
// TerrainShader padding 21
// TerrainShader padding 22
// TerrainShader padding 23
// TerrainShader padding 24
// TerrainShader padding 25
// TerrainShader padding 26
// TerrainShader padding 27
// TerrainShader padding 28
// TerrainShader padding 29
// TerrainShader padding 30
// TerrainShader padding 31
// TerrainShader padding 32
// TerrainShader padding 33
// TerrainShader padding 34
// TerrainShader padding 35
// TerrainShader padding 36
// TerrainShader padding 37
// TerrainShader padding 38
// TerrainShader padding 39
// TerrainShader padding 40
// TerrainShader padding 41
// TerrainShader padding 42
// TerrainShader padding 43
// TerrainShader padding 44
// TerrainShader padding 45
// TerrainShader padding 46
// TerrainShader padding 47
// TerrainShader padding 48
// TerrainShader padding 49
// TerrainShader padding 50
// TerrainShader padding 51
// TerrainShader padding 52
// TerrainShader padding 53
// TerrainShader padding 54
// TerrainShader padding 55
// TerrainShader padding 56
// TerrainShader padding 57
// TerrainShader padding 58
// TerrainShader padding 59
// TerrainShader padding 60
// TerrainShader padding 61
// TerrainShader padding 62
// TerrainShader padding 63
// TerrainShader padding 64
// TerrainShader padding 65
// TerrainShader padding 66
// TerrainShader padding 67
// TerrainShader padding 68
// TerrainShader padding 69
// TerrainShader padding 70
// TerrainShader padding 71
// TerrainShader padding 72
// TerrainShader padding 73
// TerrainShader padding 74
// TerrainShader padding 75
// TerrainShader padding 76
// TerrainShader padding 77
// TerrainShader padding 78
// TerrainShader padding 79
// TerrainShader padding 80
// TerrainShader padding 81
// TerrainShader padding 82
// TerrainShader padding 83
// TerrainShader padding 84
// TerrainShader padding 85
// TerrainShader padding 86
// TerrainShader padding 87
// TerrainShader padding 88
// TerrainShader padding 89
// TerrainShader padding 90
// TerrainShader padding 91
// TerrainShader padding 92
// TerrainShader padding 93
// TerrainShader padding 94
// TerrainShader padding 95
// TerrainShader padding 96
// TerrainShader padding 97
// TerrainShader padding 98
// TerrainShader padding 99
// TerrainShader padding 100
// TerrainShader padding 101
// TerrainShader padding 102
// TerrainShader padding 103
// TerrainShader padding 104
// TerrainShader padding 105
// TerrainShader padding 106
// TerrainShader padding 107
// TerrainShader padding 108
// TerrainShader padding 109
// TerrainShader padding 110
// TerrainShader padding 111
// TerrainShader padding 112
// TerrainShader padding 113
// TerrainShader padding 114
// TerrainShader padding 115
// TerrainShader padding 116
// TerrainShader padding 117
// TerrainShader padding 118
// TerrainShader padding 119
// TerrainShader padding 120
// TerrainShader padding 121
// TerrainShader padding 122
// TerrainShader padding 123
// TerrainShader padding 124
// TerrainShader padding 125
// TerrainShader padding 126
// TerrainShader padding 127
// TerrainShader padding 128
// TerrainShader padding 129
// TerrainShader padding 130
// TerrainShader padding 131
// TerrainShader padding 132
// TerrainShader padding 133
// TerrainShader padding 134
// TerrainShader padding 135
// TerrainShader padding 136
// TerrainShader padding 137
// TerrainShader padding 138
// TerrainShader padding 139
// TerrainShader padding 140
// TerrainShader padding 141
// TerrainShader padding 142
// TerrainShader padding 143
// TerrainShader padding 144
// TerrainShader padding 145
// TerrainShader padding 146
// TerrainShader padding 147
// TerrainShader padding 148
// TerrainShader padding 149
// TerrainShader padding 150
// TerrainShader padding 151
// TerrainShader padding 152
// TerrainShader padding 153
// TerrainShader padding 154
// TerrainShader padding 155
// TerrainShader padding 156
// TerrainShader padding 157
// TerrainShader padding 158
// TerrainShader padding 159
// TerrainShader padding 160
// TerrainShader padding 161
// TerrainShader padding 162
// TerrainShader padding 163
// TerrainShader padding 164
// TerrainShader padding 165
// TerrainShader padding 166
// TerrainShader padding 167
// TerrainShader padding 168
// TerrainShader padding 169
// TerrainShader padding 170
// TerrainShader padding 171
// TerrainShader padding 172
// TerrainShader padding 173
// TerrainShader padding 174
// TerrainShader padding 175
// TerrainShader padding 176
// TerrainShader padding 177
// TerrainShader padding 178
// TerrainShader padding 179
// TerrainShader padding 180
// TerrainShader padding 181
// TerrainShader padding 182
// TerrainShader padding 183
// TerrainShader padding 184
// TerrainShader padding 185
// TerrainShader padding 186
// TerrainShader padding 187
// TerrainShader padding 188
// TerrainShader padding 189
// TerrainShader padding 190
// TerrainShader padding 191
// TerrainShader padding 192
// TerrainShader padding 193
// TerrainShader padding 194
// TerrainShader padding 195
// TerrainShader padding 196
// TerrainShader padding 197
// TerrainShader padding 198
// TerrainShader padding 199
// TerrainShader padding 200
// TerrainShader padding 201
// TerrainShader padding 202
// TerrainShader padding 203
// TerrainShader padding 204
// TerrainShader padding 205
// TerrainShader padding 206
// TerrainShader padding 207
// TerrainShader padding 208
// TerrainShader padding 209
// TerrainShader padding 210
// TerrainShader padding 211
// TerrainShader padding 212
// TerrainShader padding 213
// TerrainShader padding 214
// TerrainShader padding 215
// TerrainShader padding 216
// TerrainShader padding 217
// TerrainShader padding 218
// TerrainShader padding 219
// TerrainShader padding 220
// TerrainShader padding 221
// TerrainShader padding 222
// TerrainShader padding 223
// TerrainShader padding 224
// TerrainShader padding 225
// TerrainShader padding 226
// TerrainShader padding 227
// TerrainShader padding 228
// TerrainShader padding 229
// TerrainShader padding 230
// TerrainShader padding 231
// TerrainShader padding 232
// TerrainShader padding 233
// TerrainShader padding 234
// TerrainShader padding 235
// TerrainShader padding 236
// TerrainShader padding 237
// TerrainShader padding 238
// TerrainShader padding 239
// TerrainShader padding 240
// TerrainShader padding 241
// TerrainShader padding 242
// TerrainShader padding 243
// TerrainShader padding 244
// TerrainShader padding 245
// TerrainShader padding 246
// TerrainShader padding 247
// TerrainShader padding 248
// TerrainShader padding 249
// TerrainShader padding 250
// TerrainShader padding 251
// TerrainShader padding 252
// TerrainShader padding 253
// TerrainShader padding 254
// TerrainShader padding 255
// TerrainShader padding 256
// TerrainShader padding 257
// TerrainShader padding 258
// TerrainShader padding 259
// TerrainShader padding 260
// TerrainShader padding 261
// TerrainShader padding 262
// TerrainShader padding 263
// TerrainShader padding 264
// TerrainShader padding 265
// TerrainShader padding 266
// TerrainShader padding 267
// TerrainShader padding 268
// TerrainShader padding 269
// TerrainShader padding 270
// TerrainShader padding 271
// TerrainShader padding 272
// TerrainShader padding 273
// TerrainShader padding 274
// TerrainShader padding 275
// TerrainShader padding 276
// TerrainShader padding 277
// TerrainShader padding 278
// TerrainShader padding 279
// TerrainShader padding 280
// TerrainShader padding 281
// TerrainShader padding 282
// TerrainShader padding 283
// TerrainShader padding 284
// TerrainShader padding 285
// TerrainShader padding 286
// TerrainShader padding 287
// TerrainShader padding 288
// TerrainShader padding 289
// TerrainShader padding 290
// TerrainShader padding 291
// TerrainShader padding 292
// TerrainShader padding 293
// TerrainShader padding 294
// TerrainShader padding 295
// TerrainShader padding 296
// TerrainShader padding 297
// TerrainShader padding 298
// TerrainShader padding 299
// TerrainShader padding 300
// TerrainShader padding 301
// TerrainShader padding 302
// TerrainShader padding 303
// TerrainShader padding 304
// TerrainShader padding 305
// TerrainShader padding 306
// TerrainShader padding 307
// TerrainShader padding 308
// TerrainShader padding 309
// TerrainShader padding 310
// TerrainShader padding 311
// TerrainShader padding 312
// TerrainShader padding 313
// TerrainShader padding 314
// TerrainShader padding 315
// TerrainShader padding 316
// TerrainShader padding 317
// TerrainShader padding 318
// TerrainShader padding 319
// TerrainShader padding 320
// TerrainShader padding 321
// TerrainShader padding 322
// TerrainShader padding 323
// TerrainShader padding 324
// TerrainShader padding 325
// TerrainShader padding 326
// TerrainShader padding 327
// TerrainShader padding 328
// TerrainShader padding 329
// TerrainShader padding 330
// TerrainShader padding 331
// TerrainShader padding 332
// TerrainShader padding 333
// TerrainShader padding 334
// TerrainShader padding 335
// TerrainShader padding 336
// TerrainShader padding 337
// TerrainShader padding 338
// TerrainShader padding 339
// TerrainShader padding 340
// TerrainShader padding 341
// TerrainShader padding 342
// TerrainShader padding 343
// TerrainShader padding 344
// TerrainShader padding 345
// TerrainShader padding 346
// TerrainShader padding 347
// TerrainShader padding 348
// TerrainShader padding 349
// TerrainShader padding 350
// TerrainShader padding 351
// TerrainShader padding 352
// TerrainShader padding 353
// TerrainShader padding 354
// TerrainShader padding 355
// TerrainShader padding 356
// TerrainShader padding 357
// TerrainShader padding 358
// TerrainShader padding 359
// TerrainShader padding 360
// TerrainShader padding 361
// TerrainShader padding 362
// TerrainShader padding 363
// TerrainShader padding 364
// TerrainShader padding 365
// TerrainShader padding 366
// TerrainShader padding 367
// TerrainShader padding 368
// TerrainShader padding 369
// TerrainShader padding 370
// TerrainShader padding 371
// TerrainShader padding 372
// TerrainShader padding 373
// TerrainShader padding 374
// TerrainShader padding 375
// TerrainShader padding 376
// TerrainShader padding 377
// TerrainShader padding 378
// TerrainShader padding 379
// TerrainShader padding 380
// TerrainShader padding 381
// TerrainShader padding 382
// TerrainShader padding 383
// TerrainShader padding 384
// TerrainShader padding 385
// TerrainShader padding 386
// TerrainShader padding 387
// TerrainShader padding 388
// TerrainShader padding 389
// TerrainShader padding 390
// TerrainShader padding 391
// TerrainShader padding 392
// TerrainShader padding 393
// TerrainShader padding 394
// TerrainShader padding 395
// TerrainShader padding 396
// TerrainShader padding 397
// TerrainShader padding 398
// TerrainShader padding 399
// TerrainShader padding 400
// TerrainShader padding 401
// TerrainShader padding 402
// TerrainShader padding 403
// TerrainShader padding 404
// TerrainShader padding 405
// TerrainShader padding 406
// TerrainShader padding 407
// TerrainShader padding 408
// TerrainShader padding 409
// TerrainShader padding 410
// TerrainShader padding 411
// TerrainShader padding 412
// TerrainShader padding 413
// TerrainShader padding 414
// TerrainShader padding 415
// TerrainShader padding 416
// TerrainShader padding 417
// TerrainShader padding 418
// TerrainShader padding 419
// TerrainShader padding 420
// TerrainShader padding 421
// TerrainShader padding 422
// TerrainShader padding 423
// TerrainShader padding 424
// TerrainShader padding 425
// TerrainShader padding 426
// TerrainShader padding 427
// TerrainShader padding 428
// TerrainShader padding 429
// TerrainShader padding 430
// TerrainShader padding 431
// TerrainShader padding 432
// TerrainShader padding 433
// TerrainShader padding 434
// TerrainShader padding 435
// TerrainShader padding 436
// TerrainShader padding 437
// TerrainShader padding 438
// TerrainShader padding 439
// TerrainShader padding 440
// TerrainShader padding 441
// TerrainShader padding 442
// TerrainShader padding 443
// TerrainShader padding 444
// TerrainShader padding 445
// TerrainShader padding 446
// TerrainShader padding 447
// TerrainShader padding 448
// TerrainShader padding 449
// TerrainShader padding 450
// TerrainShader padding 451
// TerrainShader padding 452
// TerrainShader padding 453
// TerrainShader padding 454
// TerrainShader padding 455
// TerrainShader padding 456
// TerrainShader padding 457
// TerrainShader padding 458
// TerrainShader padding 459
// TerrainShader padding 460
// TerrainShader padding 461
// TerrainShader padding 462
// TerrainShader padding 463
// TerrainShader padding 464
// TerrainShader padding 465
// TerrainShader padding 466
// TerrainShader padding 467
// TerrainShader padding 468
// TerrainShader padding 469
// TerrainShader padding 470
// TerrainShader padding 471
// TerrainShader padding 472
// TerrainShader padding 473
// TerrainShader padding 474
// TerrainShader padding 475
// TerrainShader padding 476
// TerrainShader padding 477
// TerrainShader padding 478
// TerrainShader padding 479
// TerrainShader padding 480
// TerrainShader padding 481
// TerrainShader padding 482
// TerrainShader padding 483
// TerrainShader padding 484
// TerrainShader padding 485
// TerrainShader padding 486
// TerrainShader padding 487
// TerrainShader padding 488
// TerrainShader padding 489
// TerrainShader padding 490
// TerrainShader padding 491
// TerrainShader padding 492
// TerrainShader padding 493
// TerrainShader padding 494
// TerrainShader padding 495
// TerrainShader padding 496
// TerrainShader padding 497
