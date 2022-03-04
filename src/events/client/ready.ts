import Application from '../../components/Application/Application';
import { UtilsDiscord } from '../../utils/UtilsDiscord';
import { AppConfig } from '../../config/AppConfig';

export default async (client: Application) => {
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
  console.log(AppConfig.development);
};
