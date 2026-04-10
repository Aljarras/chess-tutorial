# Chess Opening Rules for AI Parsing

This document defines the standard sequences for three popular chess openings using Algebraic Notation.

---

## ♟️ 1. The Queen's Gambit
A classic, aggressive opening for White that offers a wing pawn to gain control of the center.

* **Turn 1 (White):** Move Queen's Pawn to d4 (`d4`)
* **Turn 1 (Black):** Black responds with Queen's Pawn to d5 (`d5`)
* **Turn 2 (White):** White offers the gambit with the Queen's Bishop Pawn to c4 (`c4`)

> **Full Sequence:** 1. d4 d5 2. c4

---

## ♟️ 2. The London System
A solid, setup-based opening for White that can be played against almost anything Black does.

* **Turn 1 (White):** Move Queen's Pawn to d4 (`d4`)
* **Turn 1 (Black):** Black usually responds with King's Knight to f6 (`Nf6`) or d5 (`d5`)
* **Turn 2 (White):** White develops the Dark-Squared Bishop to f4 (`Bf4`)

> **Full Sequence (vs Nf6):** 1. d4 Nf6 2. Bf4
> **Full Sequence (vs d5):** 1. d4 d5 2. Bf4

---

## ♟️ 3. The Scandinavian Defense
An immediate counter-attack by Black against White's King Pawn opening.

* **Turn 1 (White):** Move King's Pawn to e4 (`e4`)
* **Turn 1 (Black):** Black immediately strikes the center with Queen's Pawn to d5 (`d5`)
* **Turn 2 (White):** White captures the pawn on d5 (`exd5`)
* **Turn 2 (Black):** Black captures back with the Queen (`Qxd5`)

> **Full Sequence:** 1. e4 d5 2. exd5 Qxd5

---

## 📊 Summary Table for LLM Parsing

| Opening Name | Turn | Side | Move (SAN) | Piece Moved | Destination |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **Queen's Gambit** | 1 | White | `d4` | Pawn | d4 |
| | 1 | Black | `d5` | Pawn | d5 |
| | 2 | White | `c4` | Pawn | c4 |
| **The London** | 1 | White | `d4` | Pawn | d4 |
| | 1 | Black | `Nf6` | Knight | f6 |
| | 2 | White | `Bf4` | Bishop | f4 |
| **Scandinavian** | 1 | White | `e4` | Pawn | e4 |
| | 1 | Black | `d5` | Pawn | d5 |
| | 2 | White | `exd5` | Pawn | d5 (Capture) |
| | 2 | Black | `Qxd5` | Queen | d5 (Capture) |