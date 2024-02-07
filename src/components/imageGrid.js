import { Container, Row, Image, Modal } from 'react-bootstrap';
import {useState} from 'react';
import Card from 'react-bootstrap/Card';

const ImageGrid = ({ images }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleShowModal = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);
    return (
    <>
        <Container>
            <Row>
                {images.map((image, index) => (
                    <Card key={index} style={{ width: '18rem' }} onClick={() => handleShowModal(image.url)}>
                    <Card.Img variant="top" name="img" src={image.thumbnailUrl} alt={image.title} role="img"/>      
                    <Card.Title id={'card_'+image.id}>
                        {image.title}
                    </Card.Title>
                    </Card>
                ))}
            </Row>
        </Container>
         <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Image Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image src={selectedImage} fluid />
            </Modal.Body>
        </Modal>
    </>
    );
  };

export default ImageGrid;