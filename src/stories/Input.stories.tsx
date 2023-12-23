import './../index.css';
import Input from '../components/input/Input';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Input> = {
  args: {
    register: () => {},
    id: 'name',
    errors: {},
    placeholder: 'Enter your name',
    required: true,
    label: 'Name',
    subtitle: 'This information is required',
  },
};
