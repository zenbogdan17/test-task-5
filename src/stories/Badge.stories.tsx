import Badge from '../components/badge/Badge';
import './../index.css';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
  title: 'Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Badge> = {
  args: { label: 'Label' },
};
