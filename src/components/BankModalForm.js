import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Cookies from 'js-cookie';

export default function BankModalForm({ show, onClose, onSuccess, initialData = {} }) {
  const [formData, setFormData] = useState({
    account_holder_name: '',
    bank_name: '',
    iban: '',
    swift_code: '',
    paypal_email: '',
  });

  const isEditMode = Object.keys(initialData).length > 0;

  // Prefill form data if editing
  useEffect(() => {
    if (isEditMode) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [isEditMode, initialData]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('auth_token');

    try {
      const res = await fetch('/api/bank-detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(`${data.message} bank details`);
      onSuccess?.();
      if (isEditMode) onClose?.(); // allow close only if edit
    } catch (error) {
      console.error(error);
      alert('❌ Failed to save bank details.');
    }
  };

  return (
    <Modal
      show={show}
      onHide={isEditMode ? onClose : undefined}
      backdrop="static"
      keyboard={isEditMode}
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={isEditMode}>
          <Modal.Title>Enter Bank Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              name="account_holder_name"
              placeholder="Account Holder Name"
              value={formData.account_holder_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="bank_name"
              placeholder="Bank Name"
              value={formData.bank_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="iban"
              placeholder="IBAN"
              value={formData.iban}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="swift_code"
              placeholder="SWIFT Code"
              value={formData.swift_code}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="paypal_email"
              placeholder="PayPal Email"
              type="email"
              value={formData.paypal_email}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          {isEditMode && (
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
