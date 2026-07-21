---
title: "Electronic Dual-Fuel System"
permalink: /projects/dual-fuel-system/
---

# 🚜 Electronic Dual-Fuel System

## 📌 Overview

Design and implementation of an electronically controlled dual-fuel system for a diesel engine using diesel fuel and Jatropha vegetable oil.

This project was developed as part of my final academic project in Agricultural Equipment Engineering.

---

## 🎯 Project Objective

The objective was to develop a system capable of:

- controlling two different fuels;
- preheating vegetable oil;
- monitoring temperature;
- automatically controlling fuel supply;
- managing fuel levels;
- enabling a smooth transition between diesel and vegetable oil.

---

## 🛠️ Technologies Used

### Electronics

- Arduino Uno
- DS18B20 temperature sensors
- LCD 16×2 I2C
- Solenoid valve
- Relays
- Level sensors
- Heating system

### Programming

- C/C++
- Arduino IDE

### Mechanical Components

- Fuel reservoirs
- Copper heating coil
- Mechanical supports
- Fuel filters
- Tubing and fittings

---

## ⚙️ How It Works

The vegetable oil is preheated before being supplied to the engine.

The Arduino Uno monitors the temperature and fuel levels.

When the vegetable oil reaches the required temperature, the system controls the solenoid valve and allows the fuel system to switch from diesel to vegetable oil.

---

## 📸 Project Gallery

### Complete System

![Complete dual-fuel system](/assets/images/bicarburation/class.jpg)

### Electronic Control System

![Electronic control system](/assets/images/bicarburation/mf.jpg)

---

## 🎥 Demonstration

A video demonstration of the system will be added here.

---

## 💻 Source Code

[View the source code on GitHub](https://github.com/YOUR_USERNAME/diesel-dual-fuel-system)

---

## 📊 Results

The system enabled a controlled transition between diesel fuel and Jatropha vegetable oil.

The electronic control system allowed real-time monitoring of system parameters and automated fuel management.

---

## 🧠 Skills Demonstrated

- Embedded programming
- C/C++ programming
- Electronics
- Automation
- Mechanical design
- Agricultural engineering
- System integration
- Problem solving

## 🔥 Temperature Control

The system automatically controls the heating process.

````markdown
```cpp
if (temperature < 70) {
    digitalWrite(HEATER_PIN, HIGH);
}

if (temperature > 70) {
    digitalWrite(HEATER_PIN, LOW);
}
