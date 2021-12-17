import Application from '../../components/application/application';

export default (client: Application) => {
  console.log(`Logged in as ${client.user.tag}!`);
};
