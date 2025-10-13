import type { Route } from './+types/home';
import ApplicationTable from '~/components/ApplicationTable/ApplicationTable';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'CENTER' }];
}

export default function Home() {
  return (
    <div>
      <ApplicationTable />
    </div>
  );
}
