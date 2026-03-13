import { create } from "zustand";

type ModalState = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
};

export const modalStore = create<ModalState>(set => ({
    showModal: false,
    setShowModal: show => set({ showModal: show })
}));
