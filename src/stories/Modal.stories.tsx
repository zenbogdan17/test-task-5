import './../index.css';

import { Meta, StoryObj } from '@storybook/react';
import Modal from '../components/modal/Modal';

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Modal> = {
  args: { children: 'Modal' },
};
