import { Setting } from '../../types/Setting';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/ApiConfig';
import { Guild } from '../../types/Guild';
const settings = new Map<string, Setting>();

const cacheSetting = {
  /**
   * @param {string} id
   * @return {Promise<Setting>}
   */
  get_or_create: async (id: string): Promise<Setting> => {
    if (!settings.get(id)) {
      const guild = (await makeRequest(
        ApiConfig.get_or_create_or_update_setting(id),
        'POST'
      )) as Guild;
      settings.set(id, guild.setting);
    }
    return settings.get(id);
  },

  /**
   * @param {string} id
   * @param {Partial<Setting>} data
   */
  update: async (id: string, data: Partial<Setting>) => {
    for (const i of Object.keys(data)) {
      (await cacheSetting.get_or_create(id))[i] = data[i];
    }
  }
};

export default cacheSetting;
