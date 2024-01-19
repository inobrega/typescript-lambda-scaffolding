import { Service } from 'typedi';

@Service()
export class FeatureFlagService {
  private flags: { [key: string]: string[] } = {};

  constructor() {
    // Configurar manualmente, carregar de um arquivo de configuração local
    // ou buscar de um serviço de feature flags externo
    const loadedFlags = {
      userManagement: ['tenant1', 'tenant3'],
    };

    this.flags = loadedFlags;
  }

  isEnabledForTenant(flag: string, tenant: string): boolean {
    return this.flags[flag]?.includes(tenant) == true;
  }
}
