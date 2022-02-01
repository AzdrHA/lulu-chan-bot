import Application from '../../components/application/application';
import { UtilsDiscord } from '../../utils/utilsDiscord';

/**
 * @param {Application} client
 */
const ready = async (client: Application) => {
  await UtilsDiscord.updateGuildsStatus(client);
  await UtilsDiscord.updateMembersStatus(client);

  client.user.setPresence({
    status: 'idle',
    activities: [
      {
        name: 'Heir to the throne of the peasantry',
        type: 'PLAYING'
      }
    ]
  });

  console.log(`Logged in as ${client.user.tag}!`);
};
export default ready;
