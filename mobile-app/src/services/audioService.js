/**
 * Audio Service - Gestion de la lecture audio avec expo-av
 * Version complète avec chargement des MP3
 */

import { Audio } from 'expo-av';

// Mapping des fichiers audio
const AUDIO_FILES = {
  // Hiragana de base
  'a': require('../../assets/audio/a.mp3'),
  'i': require('../../assets/audio/i.mp3'),
  'u': require('../../assets/audio/u.mp3'),
  'e': require('../../assets/audio/e.mp3'),
  'o': require('../../assets/audio/o.mp3'),
  'ka': require('../../assets/audio/ka.mp3'),
  'ki': require('../../assets/audio/ki.mp3'),
  'ku': require('../../assets/audio/ku.mp3'),
  'ke': require('../../assets/audio/ke.mp3'),
  'ko': require('../../assets/audio/ko.mp3'),
  'sa': require('../../assets/audio/sa.mp3'),
  'shi': require('../../assets/audio/shi.mp3'),
  'su': require('../../assets/audio/su.mp3'),
  'se': require('../../assets/audio/se.mp3'),
  'so': require('../../assets/audio/so.mp3'),
  'ta': require('../../assets/audio/ta.mp3'),
  'chi': require('../../assets/audio/chi.mp3'),
  'tsu': require('../../assets/audio/tsu.mp3'),
  'te': require('../../assets/audio/te.mp3'),
  'to': require('../../assets/audio/to.mp3'),
  'na': require('../../assets/audio/na.mp3'),
  'ni': require('../../assets/audio/ni.mp3'),
  'nu': require('../../assets/audio/nu.mp3'),
  'ne': require('../../assets/audio/ne.mp3'),
  'no': require('../../assets/audio/no.mp3'),
  'ha': require('../../assets/audio/ha.mp3'),
  'hi': require('../../assets/audio/hi.mp3'),
  'fu': require('../../assets/audio/fu.mp3'),
  'he': require('../../assets/audio/he.mp3'),
  'ho': require('../../assets/audio/ho.mp3'),
  'ma': require('../../assets/audio/ma.mp3'),
  'mi': require('../../assets/audio/mi.mp3'),
  'mu': require('../../assets/audio/mu.mp3'),
  'me': require('../../assets/audio/me.mp3'),
  'mo': require('../../assets/audio/mo.mp3'),
  'ya': require('../../assets/audio/ya.mp3'),
  'yu': require('../../assets/audio/yu.mp3'),
  'yo': require('../../assets/audio/yo.mp3'),
  'ra': require('../../assets/audio/ra.mp3'),
  'ri': require('../../assets/audio/ri.mp3'),
  'ru': require('../../assets/audio/ru.mp3'),
  're': require('../../assets/audio/re.mp3'),
  'ro': require('../../assets/audio/ro.mp3'),
  'wa': require('../../assets/audio/wa.mp3'),
  'wo': require('../../assets/audio/wo.mp3'),
  'n': require('../../assets/audio/n.mp3'),

  // Dakuten (voisés)
  'ga': require('../../assets/audio/ga.mp3'),
  'gi': require('../../assets/audio/gi.mp3'),
  'gu': require('../../assets/audio/gu.mp3'),
  'ge': require('../../assets/audio/ge.mp3'),
  'go': require('../../assets/audio/go.mp3'),
  'za': require('../../assets/audio/za.mp3'),
  'ji': require('../../assets/audio/ji.mp3'),
  'zu': require('../../assets/audio/zu.mp3'),
  'ze': require('../../assets/audio/ze.mp3'),
  'zo': require('../../assets/audio/zo.mp3'),
  'da': require('../../assets/audio/da.mp3'),
  'de': require('../../assets/audio/de.mp3'),
  'do': require('../../assets/audio/do.mp3'),
  'ba': require('../../assets/audio/ba.mp3'),
  'bi': require('../../assets/audio/bi.mp3'),
  'bu': require('../../assets/audio/bu.mp3'),
  'be': require('../../assets/audio/be.mp3'),
  'bo': require('../../assets/audio/bo.mp3'),

  // Handakuten
  'pa': require('../../assets/audio/pa.mp3'),
  'pi': require('../../assets/audio/pi.mp3'),
  'pu': require('../../assets/audio/pu.mp3'),
  'pe': require('../../assets/audio/pe.mp3'),
  'po': require('../../assets/audio/po.mp3'),

  // Combinaisons
  'kya': require('../../assets/audio/kya.mp3'),
  'kyu': require('../../assets/audio/kyu.mp3'),
  'kyo': require('../../assets/audio/kyo.mp3'),
  'sha': require('../../assets/audio/sha.mp3'),
  'shu': require('../../assets/audio/shu.mp3'),
  'sho': require('../../assets/audio/sho.mp3'),
  'cha': require('../../assets/audio/cha.mp3'),
  'chu': require('../../assets/audio/chu.mp3'),
  'cho': require('../../assets/audio/cho.mp3'),
  'nya': require('../../assets/audio/nya.mp3'),
  'nyu': require('../../assets/audio/nyu.mp3'),
  'nyo': require('../../assets/audio/nyo.mp3'),
  'hya': require('../../assets/audio/hya.mp3'),
  'hyu': require('../../assets/audio/hyu.mp3'),
  'hyo': require('../../assets/audio/hyo.mp3'),
  'mya': require('../../assets/audio/mya.mp3'),
  'myu': require('../../assets/audio/myu.mp3'),
  'myo': require('../../assets/audio/myo.mp3'),
  'rya': require('../../assets/audio/rya.mp3'),
  'ryu': require('../../assets/audio/ryu.mp3'),
  'ryo': require('../../assets/audio/ryo.mp3'),
  'gya': require('../../assets/audio/gya.mp3'),
  'gyu': require('../../assets/audio/gyu.mp3'),
  'gyo': require('../../assets/audio/gyo.mp3'),
  'ja': require('../../assets/audio/ja.mp3'),
  'ju': require('../../assets/audio/ju.mp3'),
  'jo': require('../../assets/audio/jo.mp3'),
  'bya': require('../../assets/audio/bya.mp3'),
  'byu': require('../../assets/audio/byu.mp3'),
  'byo': require('../../assets/audio/byo.mp3'),
  'pya': require('../../assets/audio/pya.mp3'),
  'pyu': require('../../assets/audio/pyu.mp3'),
  'pyo': require('../../assets/audio/pyo.mp3'),

  // ========================================
  // KANJI N5 - Mots complets
  // ========================================

  // Nombres
  'ichi': require('../../assets/audio/ichi.mp3'),
  'yon': require('../../assets/audio/yon.mp3'),
  'nana': require('../../assets/audio/nana.mp3'),
  'san': require('../../assets/audio/san.mp3'),
  'roku': require('../../assets/audio/roku.mp3'),
  'shichi': require('../../assets/audio/shichi.mp3'),
  'hachi': require('../../assets/audio/hachi.mp3'),
  'kyuu': require('../../assets/audio/kyuu.mp3'),
  'juu': require('../../assets/audio/juu.mp3'),
  'hyaku': require('../../assets/audio/hyaku.mp3'),
  'sen': require('../../assets/audio/sen.mp3'),
  'man': require('../../assets/audio/man.mp3'),
  'en': require('../../assets/audio/en.mp3'),

  // Temps & Jours
  'nichi': require('../../assets/audio/nichi.mp3'),
  'getsu': require('../../assets/audio/getsu.mp3'),
  'sui': require('../../assets/audio/sui.mp3'),
  'moku': require('../../assets/audio/moku.mp3'),
  'kin': require('../../assets/audio/kin.mp3'),
  'kawa': require('../../assets/audio/kawa.mp3'),

  // Personnes
  'hito': require('../../assets/audio/hito.mp3'),
  'otoko': require('../../assets/audio/otoko.mp3'),
  'onna': require('../../assets/audio/onna.mp3'),
  'chikara': require('../../assets/audio/chikara.mp3'),

  // Taille & Direction
  'dai': require('../../assets/audio/dai.mp3'),
  'shou': require('../../assets/audio/shou.mp3'),
  'ue': require('../../assets/audio/ue.mp3'),
  'shita': require('../../assets/audio/shita.mp3'),
  'naka': require('../../assets/audio/naka.mp3'),
  'hidari': require('../../assets/audio/hidari.mp3'),
  'migi': require('../../assets/audio/migi.mp3'),
  'hairu': require('../../assets/audio/hairu.mp3'),
  'deru': require('../../assets/audio/deru.mp3'),
  'hon': require('../../assets/audio/hon.mp3'),

  // Noms & Ecole
  'mae': require('../../assets/audio/mae.mp3'),
  'ato': require('../../assets/audio/ato.mp3'),
  'toshi': require('../../assets/audio/toshi.mp3'),
  'gaku': require('../../assets/audio/gaku.mp3'),
  'sei': require('../../assets/audio/sei.mp3'),
  'kou': require('../../assets/audio/kou.mp3'),
  'fun': require('../../assets/audio/fun.mp3'),
  'han': require('../../assets/audio/han.mp3'),

  // ========================================
  // KANJI N5 - Leçons 11-20 (Nouveaux)
  // ========================================

  // Leçon 11: Météo & Nature
  'ten': require('../../assets/audio/ten.mp3'),
  'ki': require('../../assets/audio/ki.mp3'),
  'ame': require('../../assets/audio/ame.mp3'),
  'sora': require('../../assets/audio/sora.mp3'),
  'hana': require('../../assets/audio/hana.mp3'),

  // Leçon 12: Communication
  'miru': require('../../assets/audio/miru.mp3'),
  'kiku': require('../../assets/audio/kiku.mp3'),
  'hanasu': require('../../assets/audio/hanasu.mp3'),
  'yomu': require('../../assets/audio/yomu.mp3'),
  'kaku': require('../../assets/audio/kaku.mp3'),

  // Leçon 13: Langues & Mouvement
  // 'go': déjà inclus via hiragana
  'iu': require('../../assets/audio/iu.mp3'),
  'iku': require('../../assets/audio/iku.mp3'),
  'kuru': require('../../assets/audio/kuru.mp3'),
  'taberu': require('../../assets/audio/taberu.mp3'),

  // Leçon 14: Actions Quotidiennes
  'nomu': require('../../assets/audio/nomu.mp3'),
  'kau': require('../../assets/audio/kau.mp3'),
  'yasumu': require('../../assets/audio/yasumu.mp3'),
  'nani': require('../../assets/audio/nani.mp3'),
  'ima': require('../../assets/audio/ima.mp3'),

  // Leçon 15: Temps & Cycle
  'mai': require('../../assets/audio/mai.mp3'),
  'shuu': require('../../assets/audio/shuu.mp3'),
  'atarashii': require('../../assets/audio/atarashii.mp3'),
  'furui': require('../../assets/audio/furui.mp3'),
  'nagai': require('../../assets/audio/nagai.mp3'),

  // Leçon 16: Adjectifs
  'takai': require('../../assets/audio/takai.mp3'),
  'yasui': require('../../assets/audio/yasui.mp3'),
  'ooi': require('../../assets/audio/ooi.mp3'),
  'sukunai': require('../../assets/audio/sukunai.mp3'),
  'shiroi': require('../../assets/audio/shiroi.mp3'),

  // Leçon 17: Couleurs & Directions
  'kuroi': require('../../assets/audio/kuroi.mp3'),
  'akai': require('../../assets/audio/akai.mp3'),
  'kita': require('../../assets/audio/kita.mp3'),
  'minami': require('../../assets/audio/minami.mp3'),
  'higashi': require('../../assets/audio/higashi.mp3'),

  // Leçon 18: Pays & Chemins
  'nishi': require('../../assets/audio/nishi.mp3'),
  'kuni': require('../../assets/audio/kuni.mp3'),
  'soto': require('../../assets/audio/soto.mp3'),
  'michi': require('../../assets/audio/michi.mp3'),
  'aida': require('../../assets/audio/aida.mp3'),

  // Leçon 19: Lieux & Transport
  'mise': require('../../assets/audio/mise.mp3'),
  'eki': require('../../assets/audio/eki.mp3'),
  'den': require('../../assets/audio/den.mp3'),
  'kuruma': require('../../assets/audio/kuruma.mp3'),
  'mon': require('../../assets/audio/mon.mp3'),

  // Leçon 20: Corps & Famille
  // 'me': déjà inclus via hiragana
  'kuchi': require('../../assets/audio/kuchi.mp3'),
  // 'te': déjà inclus via hiragana
  'ashi': require('../../assets/audio/ashi.mp3'),
  'chichi': require('../../assets/audio/chichi.mp3'),
  'haha': require('../../assets/audio/haha.mp3'),
  'tomo': require('../../assets/audio/tomo.mp3'),

  // ========================================
  // VOCABULAIRE - Salutations
  // ========================================
  'konnichiwa': require('../../assets/audio/konnichiwa.mp3'),
  'ohayou': require('../../assets/audio/ohayou.mp3'),
  'konbanwa': require('../../assets/audio/konbanwa.mp3'),
  'sayounara': require('../../assets/audio/sayounara.mp3'),
  'arigatou': require('../../assets/audio/arigatou.mp3'),
  'sumimasen': require('../../assets/audio/sumimasen.mp3'),
  'gomennasai': require('../../assets/audio/gomennasai.mp3'),
  'hai': require('../../assets/audio/hai.mp3'),
  'iie': require('../../assets/audio/iie.mp3'),
  'onegaishimasu': require('../../assets/audio/onegaishimasu.mp3'),

  // ========================================
  // VOCABULAIRE - Jours de la semaine
  // ========================================
  'getsuyoubi': require('../../assets/audio/getsuyoubi.mp3'),
  'kayoubi': require('../../assets/audio/kayoubi.mp3'),
  'suiyoubi': require('../../assets/audio/suiyoubi.mp3'),
  'mokuyoubi': require('../../assets/audio/mokuyoubi.mp3'),
  'kinyoubi': require('../../assets/audio/kinyoubi.mp3'),
  'doyoubi': require('../../assets/audio/doyoubi.mp3'),
  'nichiyoubi': require('../../assets/audio/nichiyoubi.mp3'),

  // ========================================
  // VOCABULAIRE - Couleurs
  // ========================================
  'aka': require('../../assets/audio/aka.mp3'),
  'ao': require('../../assets/audio/ao.mp3'),
  'kiiro': require('../../assets/audio/kiiro.mp3'),
  'midori': require('../../assets/audio/midori.mp3'),
  'shiro': require('../../assets/audio/shiro.mp3'),
  'kuro': require('../../assets/audio/kuro.mp3'),
  'orenji': require('../../assets/audio/orenji.mp3'),
  'pinku': require('../../assets/audio/pinku.mp3'),
  'murasaki': require('../../assets/audio/murasaki.mp3'),
  'chairo': require('../../assets/audio/chairo.mp3'),

  // ========================================
  // VOCABULAIRE - Famille
  // ========================================
  'okaasan': require('../../assets/audio/okaasan.mp3'),
  'otousan': require('../../assets/audio/otousan.mp3'),
  'oniisan': require('../../assets/audio/oniisan.mp3'),
  'oneesan': require('../../assets/audio/oneesan.mp3'),
  'otouto': require('../../assets/audio/otouto.mp3'),
  'imouto': require('../../assets/audio/imouto.mp3'),
  'ojiisan': require('../../assets/audio/ojiisan.mp3'),
  'obaasan': require('../../assets/audio/obaasan.mp3'),

  // ========================================
  // VOCABULAIRE - Nourriture
  // ========================================
  'mizu': require('../../assets/audio/mizu.mp3'),
  'gohan': require('../../assets/audio/gohan.mp3'),
  'pan': require('../../assets/audio/pan.mp3'),
  'niku': require('../../assets/audio/niku.mp3'),
  'sakana': require('../../assets/audio/sakana.mp3'),
  'yasai': require('../../assets/audio/yasai.mp3'),
  'kudamono': require('../../assets/audio/kudamono.mp3'),
  'ocha': require('../../assets/audio/ocha.mp3'),
  'koohii': require('../../assets/audio/koohii.mp3'),
  'tamago': require('../../assets/audio/tamago.mp3'),
};

class AudioService {
  constructor() {
    this.currentSound = null;
    this.isPlaying = false;
    this.audioEnabled = true; // Activé par défaut maintenant que les assets sont mappés
    this.setupAudio(); // Initialiser l'audio au démarrage
  }

  /**
   * Configurer Audio pour iOS et Android
   */
  async setupAudio() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
    } catch (error) {
      // Audio setup failed
    }
  }

  /**
   * Jouer un fichier audio
   * @param {string} romaji - Le romaji du caractère (ex: 'a', 'ka', 'shi')
   */
  async play(romaji) {
    if (!this.audioEnabled) {
      return false;
    }

    // Normaliser le romaji (minuscule, trim)
    const normalizedRomaji = romaji?.toLowerCase().trim();

    if (!normalizedRomaji || !AUDIO_FILES[normalizedRomaji]) {
      return false;
    }

    try {
      // Arrêter le son précédent si en cours
      if (this.currentSound) {
        await this.stop();
      }

      // Charger et jouer le fichier audio
      const { sound } = await Audio.Sound.createAsync(
        AUDIO_FILES[normalizedRomaji],
        { shouldPlay: true }
      );

      this.currentSound = sound;
      this.isPlaying = true;

      // Nettoyer après la lecture
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          this.cleanup();
        }
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Arrêter le son actuel
   */
  async stop() {
    try {
      if (this.currentSound) {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
        this.currentSound = null;
        this.isPlaying = false;
      }
    } catch (error) {
      // Stop failed
    }
  }

  /**
   * Nettoyer le son
   */
  cleanup() {
    if (this.currentSound) {
      this.currentSound.unloadAsync();
      this.currentSound = null;
      this.isPlaying = false;
    }
  }

  /**
   * Activer le système audio (à appeler après avoir vérifié les assets)
   */
  enable() {
    this.audioEnabled = true;
    this.setupAudio();
  }

  /**
   * Désactiver le système audio
   */
  disable() {
    this.audioEnabled = false;
  }
}

// Instance singleton
const audioService = new AudioService();

export default audioService;
