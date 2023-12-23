import './../index.css';

import { Meta, StoryObj } from '@storybook/react';
import Button from '../components/button/Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: 'Button',
    outline: true,
  },
};
