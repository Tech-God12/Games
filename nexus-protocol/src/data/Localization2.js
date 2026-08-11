// ============================================================================
// Localization2.js
// Extended string tables for additional languages (ja, zh, ru, pt, it) plus
// extra UI strings not in the base Localization.js. Merged into the runtime
// string table on load. Keeps the game fully localizable across major markets.
// ============================================================================

const ExtraStrings = {
  ja: {
    'menu.title': 'ネクサス・プロトコル', 'menu.subtitle': 'アリーナ・サバイバー', 'menu.play': '出撃', 'menu.settings': '設定',
    'menu.characters': 'オペレーター', 'menu.arsenal': '武器庫', 'menu.codex': '図鑑', 'menu.quit': '終了',
    'pause.title': '一時停止', 'pause.resume': '再開', 'pause.settings': '設定', 'pause.shop': 'ショップ', 'pause.quit': '撤退',
    'gameover.title': 'ラン終了', 'gameover.retry': '再出撃', 'gameover.menu': 'メインメニュー',
    'levelup.title': 'レベルアップ', 'levelup.subtitle': 'アップグレードを選択', 'settings.title': '設定',
    'shop.title': '武器庫', 'codex.title': '図鑑', 'common.back': '戻る', 'common.close': '閉じる',
    'hud.wave': 'ウェーブ {0}', 'hud.score': 'スコア {0}', 'hud.kills': 'キル {0}', 'hud.dash': 'ダッシュ', 'hud.ability': 'アビリティ',
    'controls.title': '操作方法', 'controls.move': '移動', 'controls.look': '視点', 'controls.fire': '発射', 'controls.reload': 'リロード',
    'controls.dash': 'ダッシュ', 'controls.jump': 'ジャンプ', 'controls.ability': 'アビリティ', 'controls.pause': '一時停止',
  },
  zh: {
    'menu.title': '协议枢纽', 'menu.subtitle': '竞技场幸存者', 'menu.play': '部署', 'menu.settings': '设置',
    'menu.characters': '特工', 'menu.arsenal': '军械库', 'menu.codex': '图鉴', 'menu.quit': '退出',
    'pause.title': '已暂停', 'pause.resume': '继续', 'pause.settings': '设置', 'pause.shop': '商店', 'pause.quit': '中止',
    'gameover.title': '回合结束', 'gameover.retry': '重新部署', 'gameover.menu': '主菜单',
    'levelup.title': '升级', 'levelup.subtitle': '选择升级', 'settings.title': '设置',
    'shop.title': '军械库', 'codex.title': '图鉴', 'common.back': '返回', 'common.close': '关闭',
    'hud.wave': '第 {0} 波', 'hud.score': '分数 {0}', 'hud.kills': '击杀 {0}', 'hud.dash': '冲刺', 'hud.ability': '技能',
    'controls.title': '操作', 'controls.move': '移动', 'controls.look': '视角', 'controls.fire': '开火', 'controls.reload': '装弹',
    'controls.dash': '冲刺', 'controls.jump': '跳跃', 'controls.ability': '技能', 'controls.pause': '暂停',
  },
  ru: {
    'menu.title': 'NEXUS PROTOCOL', 'menu.subtitle': 'Выживший на арене', 'menu.play': 'Выступить', 'menu.settings': 'Настройки',
    'menu.characters': 'Оперативники', 'menu.arsenal': 'Арсенал', 'menu.codex': 'Кодекс', 'menu.quit': 'Выход',
    'pause.title': 'ПАУЗА', 'pause.resume': 'Продолжить', 'pause.settings': 'Настройки', 'pause.shop': 'Магазин', 'pause.quit': 'Прервать',
    'gameover.title': 'ЗАБЕГ ОКОНЧЕН', 'gameover.retry': 'Повторить', 'gameover.menu': 'Главное меню',
    'levelup.title': 'УРОВЕНЬ ПОВЫШЕН', 'levelup.subtitle': 'Выберите улучшение', 'settings.title': 'НАСТРОЙКИ',
    'shop.title': 'АРСЕНАЛ', 'codex.title': 'КОДЕКС', 'common.back': 'Назад', 'common.close': 'Закрыть',
    'hud.wave': 'ВОЛНА {0}', 'hud.score': 'ОЧКИ {0}', 'hud.kills': 'УБИЙСТВА {0}', 'hud.dash': 'РЫВОК', 'hud.ability': 'СПОСОБНОСТЬ',
    'controls.title': 'Управление', 'controls.move': 'Движение', 'controls.look': 'Обзор', 'controls.fire': 'Огонь', 'controls.reload': 'Перезарядка',
    'controls.dash': 'Рывок', 'controls.jump': 'Прыжок', 'controls.ability': 'Способность', 'controls.pause': 'Пауза',
  },
  pt: {
    'menu.title': 'NEXUS PROTOCOL', 'menu.subtitle': 'Sobrevivente da Arena', 'menu.play': 'Despachar', 'menu.settings': 'Ajustes',
    'menu.characters': 'Operativos', 'menu.arsenal': 'Arsenal', 'menu.codex': 'Códex', 'menu.quit': 'Sair',
    'pause.title': 'PAUSADO', 'pause.resume': 'Retomar', 'pause.settings': 'Ajustes', 'pause.shop': 'Loja', 'pause.quit': 'Abortar',
    'gameover.title': 'FIM DA RUN', 'gameover.retry': 'Re-despachar', 'gameover.menu': 'Menu Principal',
    'levelup.title': 'SUBIU DE NÍVEL', 'levelup.subtitle': 'Escolha uma melhoria', 'settings.title': 'AJUSTES',
    'shop.title': 'ARSENAL', 'codex.title': 'CÓDEX', 'common.back': 'Voltar', 'common.close': 'Fechar',
    'hud.wave': 'ONDA {0}', 'hud.score': 'PONTOS {0}', 'hud.kills': 'ABATES {0}', 'hud.dash': 'ARRANCADA', 'hud.ability': 'HABILIDADE',
    'controls.title': 'Controles', 'controls.move': 'Mover', 'controls.look': 'Olhar', 'controls.fire': 'Atirar', 'controls.reload': 'Recarregar',
    'controls.dash': 'Arrancada', 'controls.jump': 'Pular', 'controls.ability': 'Habilidade', 'controls.pause': 'Pausar',
  },
  it: {
    'menu.title': 'NEXUS PROTOCOL', 'menu.subtitle': 'Sopravvissuto dell\'Arena', 'menu.play': 'Schierati', 'menu.settings': 'Impostazioni',
    'menu.characters': 'Operativi', 'menu.arsenal': 'Arsenale', 'menu.codex': 'Codex', 'menu.quit': 'Esci',
    'pause.title': 'IN PAUSA', 'pause.resume': 'Riprendi', 'pause.settings': 'Impostazioni', 'pause.shop': 'Negozio', 'pause.quit': 'Interrompi',
    'gameover.title': 'RUN TERMINATA', 'gameover.retry': 'Rischierati', 'gameover.menu': 'Menu Principale',
    'levelup.title': 'LIVELLO ALZATO', 'levelup.subtitle': 'Scegli un potenziamento', 'settings.title': 'IMPOSTAZIONI',
    'shop.title': 'ARSENALE', 'codex.title': 'CODEX', 'common.back': 'Indietro', 'common.close': 'Chiudi',
    'hud.wave': 'ONDATA {0}', 'hud.score': 'PUNTI {0}', 'hud.kills': 'UCISIONI {0}', 'hud.dash': 'SCATTO', 'hud.ability': 'ABILITÀ',
    'controls.title': 'Controlli', 'controls.move': 'Movimento', 'controls.look': 'Visuale', 'controls.fire': 'Spara', 'controls.reload': 'Ricarica',
    'controls.dash': 'Scatto', 'controls.jump': 'Salta', 'controls.ability': 'Abilità', 'controls.pause': 'Pausa',
  },
  ko: {
    'menu.title': '넥서스 프로토콜', 'menu.subtitle': '아레나 생존자', 'menu.play': '출격', 'menu.settings': '설정',
    'menu.characters': '요원', 'menu.arsenal': '병기고', 'menu.codex': '도감', 'menu.quit': '종료',
    'pause.title': '일시정지', 'pause.resume': '재개', 'pause.settings': '설정', 'pause.shop': '상점', 'pause.quit': '중단',
    'gameover.title': '런 종료', 'gameover.retry': '재출격', 'gameover.menu': '메인 메뉴',
    'levelup.title': '레벨 업', 'levelup.subtitle': '업그레이드 선택', 'settings.title': '설정',
    'shop.title': '병기고', 'codex.title': '도감', 'common.back': '뒤로', 'common.close': '닫기',
    'hud.wave': '웨이브 {0}', 'hud.score': '점수 {0}', 'hud.kills': '처치 {0}', 'hud.dash': '대시', 'hud.ability': '능력',
  },
  zh_TW: {
    'menu.title': '協議樞紐', 'menu.subtitle': '競技場倖存者', 'menu.play': '部署', 'menu.settings': '設定',
    'menu.characters': '特工', 'menu.arsenal': '軍械庫', 'menu.codex': '圖鑑', 'menu.quit': '退出',
    'pause.title': '已暫停', 'pause.resume': '繼續', 'pause.settings': '設定', 'pause.shop': '商店', 'pause.quit': '中止',
    'gameover.title': '回合結束', 'gameover.retry': '重新部署', 'gameover.menu': '主選單',
    'levelup.title': '升級', 'levelup.subtitle': '選擇升級', 'settings.title': '設定',
    'shop.title': '軍械庫', 'codex.title': '圖鑑', 'common.back': '返回', 'common.close': '關閉',
    'hud.wave': '第 {0} 波', 'hud.score': '分數 {0}', 'hud.kills': '擊殺 {0}', 'hud.dash': '衝刺', 'hud.ability': '技能',
  },
  pl: {
    'menu.title': 'NEXUS PROTOCOL', 'menu.subtitle': 'Ocalały Areny', 'menu.play': 'Wyrusz', 'menu.settings': 'Ustawienia',
    'menu.characters': 'Operatorzy', 'menu.arsenal': 'Arsenał', 'menu.codex': 'Kodeks', 'menu.quit': 'Wyjdź',
    'pause.title': 'PAUZA', 'pause.resume': 'Wznów', 'pause.settings': 'Ustawienia', 'pause.shop': 'Sklep', 'pause.quit': 'Przerwij',
    'gameover.title': 'RUN ZAKOŃCZONY', 'gameover.retry': 'Ponów', 'gameover.menu': 'Menu Główne',
    'levelup.title': 'POZIOM WYŻSZY', 'levelup.subtitle': 'Wybierz ulepszenie', 'settings.title': 'USTAWIENIA',
    'shop.title': 'ARSENAŁ', 'codex.title': 'KODEKS', 'common.back': 'Wstecz', 'common.close': 'Zamknij',
    'hud.wave': 'FALA {0}', 'hud.score': 'PUNKTY {0}', 'hud.kills': 'ZABÓJSTWA {0}', 'hud.dash': 'SZYBKI KROK', 'hud.ability': 'ZDOLNOŚĆ',
  },
  tr: {
    'menu.title': 'NEXUS PROTOCOL', 'menu.subtitle': 'Arena Hayatta Kalanı', 'menu.play': 'Sefer', 'menu.settings': 'Ayarlar',
    'menu.characters': 'Operatörler', 'menu.arsenal': 'Cephane', 'menu.codex': 'Kodeks', 'menu.quit': 'Çık',
    'pause.title': 'DURAKLATILDI', 'pause.resume': 'Devam', 'pause.settings': 'Ayarlar', 'pause.shop': 'Dükkan', 'pause.quit': 'İptal',
    'gameover.title': 'RUN BİTTİ', 'gameover.retry': 'Yeniden', 'gameover.menu': 'Ana Menü',
    'levelup.title': 'SEVİYE ATLADI', 'levelup.subtitle': 'Yükseltme seç', 'settings.title': 'AYARLAR',
    'shop.title': 'CEPHANE', 'codex.title': 'KODEKS', 'common.back': 'Geri', 'common.close': 'Kapat',
    'hud.wave': 'DALGA {0}', 'hud.score': 'PUAN {0}', 'hud.kills': 'ÖLDÜRME {0}', 'hud.dash': 'ATILIŞ', 'hud.ability': 'YETENEK',
  },
  nl: {
    'menu.title': 'NEXUS PROTOCOL', 'menu.subtitle': 'Arena Overlevende', 'menu.play': 'Uitzetten', 'menu.settings': 'Instellingen',
    'menu.characters': 'Operatief', 'menu.arsenal': 'Arsenaal', 'menu.codex': 'Codex', 'menu.quit': 'Stop',
    'pause.title': 'GEPAUZEERD', 'pause.resume': 'Hervatten', 'pause.settings': 'Instellingen', 'pause.shop': 'Winkel', 'pause.quit': 'Afbreken',
    'gameover.title': 'RUN BEËINDIGD', 'gameover.retry': 'Opnieuw', 'gameover.menu': 'Hoofdmenu',
    'levelup.title': 'LEVEL OMHOOG', 'levelup.subtitle': 'Kies een upgrade', 'settings.title': 'INSTELLINGEN',
    'shop.title': 'ARSENAAL', 'codex.title': 'CODEX', 'common.back': 'Terug', 'common.close': 'Sluit',
    'hud.wave': 'GOLF {0}', 'hud.score': 'SCORE {0}', 'hud.kills': 'KILLS {0}', 'hud.dash': 'DASH', 'hud.ability': 'VAARDIGHEID',
  },
};

// Extra English strings (newer UI added after the base table)
const ExtraEn = {
  'codex.achievements': 'Achievements', 'codex.lore': 'Lore', 'codex.loreWorld': 'World', 'codex.loreFactions': 'Factions',
  'codex.loreOperatives': 'Operatives', 'codex.loreEvents': 'Events', 'menu.skilltree': 'Skill Tree', 'menu.daily': 'Daily',
  'menu.tutorial': 'How to Play', 'menu.credits': 'Credits', 'menu.achievements': 'Achievements',
  'skilltree.title': 'SKILL TREE', 'challenges.title': 'CHALLENGES', 'achievements.title': 'ACHIEVEMENTS',
  'tutorial.title': 'HOW TO PLAY', 'credits.title': 'CREDITS', 'controls.title': 'CONTROLS',
  'shop.owned': 'OWNED x{0}', 'shop.insufficient': 'Not enough currency', 'shop.subtitle': 'Spend currency on items',
  'charselect.deploy': 'Deploy', 'charselect.locked': 'LOCKED · Reach Wave {0}',
  'daily.active': 'ACTIVE', 'daily.completed': 'COMPLETED', 'daily.accept': 'Accept Challenge',
  'combo.ended': 'COMBO ENDED x{0}', 'boss.phase': '{0} — PHASE {1}',
  'objective.complete': 'Objective Complete', 'objective.flawless': 'Flawless Wave', 'objective.speed': 'Speed Clear',
  'settings.reset': 'Reset Progression', 'settings.apply': 'Apply & Save',
};

/** Merge extra strings into the base Localization module at load time. */
export function installExtraLocalization(baseModule) {
  for (const [lang, table] of Object.entries(ExtraStrings)) {
    if (!baseModule.Strings[lang]) baseModule.Strings[lang] = {};
    Object.assign(baseModule.Strings[lang], table);
  }
  Object.assign(baseModule.Strings.en, ExtraEn);
  for (const lang of Object.keys(ExtraStrings)) {
    if (!baseModule.availableLanguages().includes(lang)) {
      // availableLanguages reads Object.keys(Strings) dynamically, so it auto-includes new langs
    }
  }
}

export const ExtraLocalizationLanguages = Object.keys(ExtraStrings);
export const ExtraLocalizationStringCount = Object.values(ExtraStrings).reduce((n, t) => n + Object.keys(t).length, 0) + Object.keys(ExtraEn).length;
