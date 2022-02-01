import Application from '../../components/application/application';
import { UtilsDiscord } from '../../utils/utilsDiscord';

/**
 * @param {Application} client
 */
const ready = async (client: Application) => {
  await UtilsDiscord.updateGuildsStatus(client);
  await UtilsDiscord.updateMembersStatus(client);

  console.log(`Logged in as ${client.user.tag}!`);
};
export default ready;
