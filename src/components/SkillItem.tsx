'use client';

import { Card } from 'react-bootstrap';

/* Renders a single row in the List Note table. See list/page.tsx. */
const SkillItem = ({ skill }: { skill: string }) => {
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Card bg={color} text={color === 'light' ? 'dark' : 'light'} className="text-center my-2">
      <Card.Body>
        <Card.Text>
          {skill}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SkillItem;
