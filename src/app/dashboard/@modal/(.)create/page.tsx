import Modal from "@/components/layout/Modal";
import CreateForm from "@/components/todo/CreateForm";

export default async function Page() {
    return (
        <Modal>
            <CreateForm />
        </Modal>
    );
}

