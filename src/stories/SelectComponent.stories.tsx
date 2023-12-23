import './../index.css';
import SelectComponent from '../components/select/SelectComponent';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SelectComponent> = {
  title: 'SelectComponent',
  component: SelectComponent,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof SelectComponent> = {
  args: { handlerSelectedPokemon: () => {} },
};
