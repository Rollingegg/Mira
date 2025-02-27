import { MenuOption, NIcon } from 'naive-ui';
import {
  DesktopOutline,
  AppsOutline,
  ColorPaletteOutline
} from '@vicons/ionicons5';
import { RouterLink } from 'vue-router';

import { State } from '../store';
import { DownloadContent } from '../models/downloads';

function toOptions(items: DownloadContent[]) {
  return items.map(item => ({
    key: `/download/${item.distro}`,
    label: () => <RouterLink to={`/download/${item.distro}`}>
      {item.distro}
    </RouterLink>,
  }) as MenuOption);
}

export default function fetchDownloadRoutes(state: State, filter = '') {
  const contents = state.downloadContents
    .filter(value => value.distro.includes(filter));
  return [
    {
      label: 'OS',
      key: 'OS',
      icon: () => <NIcon><DesktopOutline /></NIcon>,
      children: toOptions(contents.filter(value => value.category == 'os'))
    },
    {
      label: 'Apps',
      key: 'Apps',
      icon: () => <NIcon><AppsOutline /></NIcon>,
      children: toOptions(contents.filter(value => value.category == 'app'))
    },
    {
      label: 'Fonts',
      key: 'Fonts',
      icon: () => <NIcon><ColorPaletteOutline /></NIcon>,
      children: toOptions(contents.filter(value => value.category == 'font'))
    }
  ] as MenuOption[];
}
