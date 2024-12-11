/* eslint-disable react/prop-types */

'use client';

import { Container, Card, Row, Col } from 'react-bootstrap';
import { Position } from '@/components/Interface';

interface CompanyPositionsProps {
  positions: Position[];
}

const CompanyPositions: React.FC<CompanyPositionsProps> = ({ positions }) => (
  <Container className="mt-5">
    <Card className="p-3" style={{ backgroundColor: 'rgba(999, 999, 999, 0.5)', border: 'none' }}>
      <Card.Body>
        <h3 className="mb-3">Open Positions</h3>
        <Row className="g-4 flex-nowrap overflow-auto">
          {positions.map((position: Position) => (
            <Col key={position.id} xs={12} md={6} lg={4}>
              <Card className="h-100">
                <Card.Body>
                  <h5>{position.title}</h5>
                  <p>{position.description}</p>
                  <p>
                    <strong>Skills:</strong>
                    {' '}
                    {Array.isArray(position.skills) ? position.skills.join(', ') : position.skills}
                  </p>
                  <p>
                    <strong>Job Type:</strong>
                    {' '}
                    {Array.isArray(position.jobType) ? position.jobType.join(', ') : position.jobType}
                  </p>
                  <p>
                    <strong>Number of Hires:</strong>
                    {' '}
                    {position.numberOfHires}
                  </p>
                  <p>
                    <strong>Salary Range:</strong>
                    {' '}
                    $
                    {position.salaryRange}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  </Container>
);

export default CompanyPositions;
