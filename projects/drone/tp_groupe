# Membre du groupe : 
# BOSSA_Chabel
# ADENIYI_Lionel
# AKOUEDENOUDJE_Yan
# AGONGNIDJESSOU_Dieu-Donnée

#  Attention fonctionne mac, pas tester sur windows. Merci 
from djitellopy import Tello
import cv2, math, time
import json
import queue
import sys
import time
import select
import termios
import tty

import sounddevice as sd
from vosk import Model, KaldiRecognizer

tello = Tello()
is_flying = False  
frame_read = None


# --------------------------------------------------------------
# GESTION CLAVIER DUAL (Terminal + Fenêtre OpenCV)
# --------------------------------------------------------------

class NonBlockingTerminal:
    def __init__(self):
        self.fd = sys.stdin.fileno()
        self.old_settings = None

    def __enter__(self):
        try:
            self.old_settings = termios.tcgetattr(self.fd)
            tty.setcbreak(self.fd)
        except Exception:
            pass
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.old_settings:
            try:
                termios.tcsetattr(self.fd, termios.TCSADRAIN, self.old_settings)
            except Exception:
                pass


def flush_input():
    """Vide le tampon clavier terminal pour éviter d'accumuler des touches pendant un mouvement."""
    try:
        while select.select([sys.stdin], [], [], 0)[0]:
            sys.stdin.read(1)
    except Exception:
        pass


def get_input_action():
    """
    Lit les événements clavier simultanément depuis la fenêtre OpenCV et le Terminal.
    """
    # 1. Verification OpenCV window
    key_raw = cv2.waitKeyEx(1)
    if key_raw != -1:
        key = key_raw & 0xff
        if key in (27, ord('v'), ord('V')): return 'SWITCH_VOICE'
        elif key_raw in (63232, 81) or key in (0, 81, ord('w'), ord('W'), ord('z'), ord('Z')): return 'UP'
        elif key_raw in (63233, 82) or key in (1, 82, ord('s'), ord('S')): return 'DOWN'
        elif key_raw in (63234, 80) or key in (2, 80, ord('a'), ord('A')): return 'LEFT'
        elif key_raw in (63235, 83) or key in (3, 83, ord('d'), ord('D')): return 'RIGHT'
        elif key in (13, 10, 32, ord('t'), ord('T')): return 'TAKEOFF'
        elif key in (ord('l'), ord('L')): return 'LAND'
        elif key in (ord('u'), ord('U'), ord('+')): return 'MONTER'
        elif key in (ord('g'), ord('G'), ord('-')): return 'DESCENDRE'
        elif key in (ord('q'), ord('Q')): return 'ROT_G'
        elif key in (ord('e'), ord('E'), ord('r'), ord('R')): return 'ROT_D'

    # 2. Verification Terminal stdin (non-bloquant)
    if select.select([sys.stdin], [], [], 0.001)[0]:
        ch = sys.stdin.read(1)
        if ch == '\x1b': # Touche ESC ou Flèches Terminal
            if select.select([sys.stdin], [], [], 0.05)[0]:
                ch2 = sys.stdin.read(1)
                if ch2 == '[':
                    if select.select([sys.stdin], [], [], 0.05)[0]:
                        ch3 = sys.stdin.read(1)
                        if ch3 == 'A': return 'UP'
                        elif ch3 == 'B': return 'DOWN'
                        elif ch3 == 'C': return 'RIGHT'
                        elif ch3 == 'D': return 'LEFT'
            return None  # Ignorer les impulsions ESC isolées pour éviter les sorties accidentelles
        elif ch in ('v', 'V'): return 'SWITCH_VOICE'
        elif ch in ('\n', '\r', ' ', 't', 'T'): return 'TAKEOFF'
        elif ch in ('l', 'L'): return 'LAND'
        elif ch in ('w', 'W', 'z', 'Z', '8'): return 'UP'
        elif ch in ('s', 'S', '2'): return 'DOWN'
        elif ch in ('a', 'A', '4'): return 'LEFT'
        elif ch in ('d', 'D', '6'): return 'RIGHT'
        elif ch in ('u', 'U', '+'): return 'MONTER'
        elif ch in ('g', 'G', '-'): return 'DESCENDRE'
        elif ch in ('q', 'Q'): return 'ROT_G'
        elif ch in ('e', 'E', 'r', 'R'): return 'ROT_D'

    return None


def do_action_with_hand():
    global is_flying

    print("\n" + "=" * 65)
    print("🎮 CONTRÔLE CLAVIER ACTIF !")
    print("-" * 65)
    print("   - T / Entrée / Espace  : Décoller")
    print("   - ⬆️ Flèche HAUT / W    : Avancer (Décolle auto si au sol)")
    print("   - ⬇️ Flèche BAS / S     : Reculer")
    print("   - ⬅️ Flèche GAUCHE / A  : Gauche")
    print("   - ➡️ Flèche DROITE / D  : Droite")
    print("   - U / G                : Monter / Descendre")
    print("   - Q / E                : Tourner Gauche / Droite")
    print("   - L                    : Atterrir")
    print("   - V                    : Passer à la reconnaissance vocale")
    print("=" * 65 + "\n")

    with NonBlockingTerminal():
        while True:
            if frame_read is not None:
                img = frame_read.frame
                cv2.imshow("drone", img)

            action = get_input_action()

            if action == 'SWITCH_VOICE':
                print("\nPassage au contrôle vocal...")
                break

            elif action == 'TAKEOFF':
                if not is_flying:
                    print("[CLAVIER] 🛫 Décollage en cours...")
                    tello.takeoff()
                    is_flying = True
                    flush_input()
                else:
                    print("[CLAVIER] Le drone est déjà en vol.")

            elif action == 'UP':
                if not is_flying:
                    print("[CLAVIER] 🛫 Décollage automatique avant d'avancer...")
                    tello.takeoff()
                    is_flying = True
                    flush_input()
                print("[CLAVIER] ⬆️ Avancer (30 cm)")
                tello.move_forward(30)
                flush_input()

            elif action == 'DOWN':
                if is_flying:
                    print("[CLAVIER] ⬇️ Reculer (30 cm)")
                    tello.move_back(30)
                    flush_input()
                else:
                    print("[CLAVIER] ⚠️ Appuyez d'abord sur T ou Flèche HAUT pour décoller !")

            elif action == 'LEFT':
                if is_flying:
                    print("[CLAVIER] ⬅️ Gauche (30 cm)")
                    tello.move_left(30)
                    flush_input()
                else:
                    print("[CLAVIER] ⚠️ Appuyez d'abord sur T ou Flèche HAUT pour décoller !")

            elif action == 'RIGHT':
                if is_flying:
                    print("[CLAVIER] ➡️ Droite (30 cm)")
                    tello.move_right(30)
                    flush_input()
                else:
                    print("[CLAVIER] ⚠️ Appuyez d'abord sur T ou Flèche HAUT pour décoller !")

            elif action == 'MONTER':
                if is_flying:
                    print("[CLAVIER] ⏫ Monter (30 cm)")
                    tello.move_up(30)
                    flush_input()
                else:
                    print("[CLAVIER] ⚠️ Appuyez d'abord sur T ou Flèche HAUT pour décoller !")

            elif action == 'DESCENDRE':
                if is_flying:
                    print("[CLAVIER] ⏬ Descendre (30 cm)")
                    tello.move_down(30)
                    flush_input()
                else:
                    print("[CLAVIER] ⚠️ Appuyez d'abord sur T ou Flèche HAUT pour décoller !")

            elif action == 'ROT_G':
                if is_flying:
                    print("[CLAVIER] 🔄 Tourner à gauche (30°)")
                    tello.rotate_counter_clockwise(30)
                    flush_input()
                else:
                    print("[CLAVIER] ⚠️ Appuyez d'abord sur T ou Flèche HAUT pour décoller !")

            elif action == 'ROT_D':
                if is_flying:
                    print("[CLAVIER] 🔄 Tourner à droite (30°)")
                    tello.rotate_clockwise(30)
                    flush_input()
                else:
                    print("[CLAVIER] ⚠️ Appuyez d'abord sur T ou Flèche HAUT pour décoller !")

            elif action == 'LAND':
                if is_flying:
                    print("[CLAVIER] 🛬 Atterrissage...")
                    tello.land()
                    is_flying = False
                    flush_input()
                else:
                    print("[CLAVIER] Le drone est déjà au sol.")

    cv2.destroyAllWindows()


# --------------------------------------------------------------
# 1. CONFIGURATION Voice Recognition
# --------------------------------------------------------------

MODEL_PATH = "vosk-model-small-fr-0.22"  
SAMPLE_RATE = 16000

BATTERY_MIN_TAKEOFF = 15  # % minimum pour autoriser un décollage
MOVE_DISTANCE_CM = 30     # distance sécurisée de 30 cm (au lieu de 100 cm)

# Vocabulaire
ACTIONS = {
    "takeoff": ["décolle", "démarre"],
    "land": ["atterrit", "atterrir", "stop"],
    "move_forward": ["avance", "avant"],
    "move_backward": ["recule", "arrière"],
    "move_up": ["monte", "monter", "haut"],
    "move_down": ["descends", "descendre", "bas"],
    "rotate_counter_clockwise": ["gauche"],
    "rotate_clockwise": ["droite"],
    "flip_forward": ["roule", "flip"],
}

EMERGENCY_WORDS = set(ACTIONS["land"])

ALL_KEYWORDS = sorted({word for words in ACTIONS.values() for word in words})
# On autorise des combinaisons de mots dans la grammaire Vosk
GRAMMAR = json.dumps(ALL_KEYWORDS + ["[unk]"], ensure_ascii=False)


# --------------------------------------------------------------
# 2. DRONE
# --------------------------------------------------------------

def extract_action_from_text(text: str):
    """Analyse les mots de la phrase pour trouver une action valide."""
    words = text.lower().split()
    for word in words:
        for action, keywords in ACTIONS.items():
            if word in keywords:
                return action
    return None


def do_action(text: str):
    global is_flying

    cleaned_text = text.lower().strip()

    # --- priorité absolue : mot d'arrêt d'urgence détecté dans la phrase ---
    if any(emergency_word in cleaned_text for emergency_word in EMERGENCY_WORDS):
        if is_flying:
            print(f"[URGENCE] '{text}' -> land()")
            tello.land()
            is_flying = False
        return

    # Extraction de l'action basée sur les mots présents
    action = extract_action_from_text(cleaned_text)
    if action is None:
        print(f"[ignoré] '{text}' ne contient aucune commande connue")
        return

    print(f"[COMMANDE] '{text}' -> {action}")

    try:
        if action == "takeoff":
            if is_flying:
                print("  -> déjà en vol, commande ignorée")
                return
            battery = tello.get_battery()
            if battery < BATTERY_MIN_TAKEOFF:
                print(f"  -> batterie trop faible ({battery}%), décollage annulé")
                return
            tello.takeoff()
            is_flying = True

        elif action == "move_forward":
            if is_flying: tello.move_forward(MOVE_DISTANCE_CM)

        elif action == "move_backward":
            if is_flying: tello.move_back(MOVE_DISTANCE_CM)

        elif action == "move_up":
            if is_flying: tello.move_up(30)

        elif action == "move_down":
            if is_flying: tello.move_down(30)

        elif action == "rotate_counter_clockwise":
            if is_flying: tello.rotate_counter_clockwise(30)

        elif action == "rotate_clockwise":
            if is_flying: tello.rotate_clockwise(30)

        elif action == "flip_forward":
            if is_flying and tello.get_battery() >= BATTERY_MIN_TAKEOFF:
                tello.flip_forward()
            else:
                print("  -> figure ignorée (pas en vol ou batterie faible)")

    except Exception as e:
        print(f"  -> ERREUR lors de l'exécution de la commande : {e}")


# --------------------------------------------------------------
# 3. CAPTURE MICRO EN CONTINU
# --------------------------------------------------------------

audio_queue = queue.Queue()


def audio_callback(indata, frames, time_info, status):
    if status:
        print("Statut audio :", status, file=sys.stderr)
    audio_queue.put(bytes(indata))


def listen_loop(recognizer):
    with sd.RawInputStream(
        samplerate=SAMPLE_RATE,
        blocksize=4000,
        dtype="int16",
        channels=1,
        callback=audio_callback,
    ):
        while True:
            data = audio_queue.get()

            if recognizer.AcceptWaveform(data):
                result = json.loads(recognizer.Result())
                text = result.get("text", "").strip()
                if text:
                    do_action(text)


# --------------------------------------------------------------
# 4. MAIN
# --------------------------------------------------------------

def main():
    global is_flying, frame_read

    print("Connexion au drone...")
    tello.connect()
    print(f"Batterie : {tello.get_battery()}%")

    # Initialisation du flux vidéo APRÈS la connexion
    tello.streamon()
    frame_read = tello.get_frame_read()

    print("Chargement du modèle Vosk...")
    model = Model(MODEL_PATH)
    recognizer = KaldiRecognizer(model, SAMPLE_RATE, GRAMMAR)
    recognizer.SetWords(True)

    print("Début du contrôle manuel (Clavier)... Appuyez sur V pour passer à la voix.")
    do_action_with_hand()

    print("\nPrêt pour le contrôle vocal ! Dites une commande (décolle, gauche, droite, atterrit...)")
    print("Ctrl+C pour arrêter proprement.\n")

    try:
        listen_loop(recognizer)
    except KeyboardInterrupt:
        print("\nArrêt demandé par l'utilisateur.")
    finally:
        if is_flying:
            print("Atterrissage de sécurité automatique...")
            try:
                tello.land()
            except Exception as e:
                print(f"Impossible d'atterrir : {e}")
        tello.end()


if __name__ == "__main__":
    main()
