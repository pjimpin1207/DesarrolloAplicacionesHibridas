import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _storage: Storage | null = null;

  private readonly DARK_MODE_KEY = 'dark-mode';
  private readonly USER_NAME_KEY = 'user-name';

  constructor(private storage: Storage) {
    this.init();
  }

  async init(): Promise<void> {
    if (this._storage != null) return;

    this._storage = await this.storage.create();
  }

  // =========================
  // MÉTODOS GENÉRICOS
  // =========================

  public async set(key: string, value: any): Promise<void> {
    await this.init();
    await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    await this.init();
    return await this._storage?.get(key);
  }

  public async remove(key: string): Promise<void> {
    await this.init();
    await this._storage?.remove(key);
  }

  // =========================
  // MÉTODOS ESPECÍFICOS
  // =========================

  // ---- MODO OSCURO ----
  async setDarkMode(value: boolean): Promise<void> {
    await this.set(this.DARK_MODE_KEY, value);
  }

  async getDarkMode(): Promise<boolean> {
    return (await this.get(this.DARK_MODE_KEY)) ?? false;
  }

  // ---- NOMBRE DE USUARIO ----
  async setUserName(name: string): Promise<void> {
    await this.set(this.USER_NAME_KEY, name);
  }

  async getUserName(): Promise<string> {
    return (await this.get(this.USER_NAME_KEY)) ?? '';
  }
}
