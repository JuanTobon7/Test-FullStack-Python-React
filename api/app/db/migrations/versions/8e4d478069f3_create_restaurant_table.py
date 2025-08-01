"""create restaurant table

Revision ID: 8e4d478069f3
Revises: 2262da0fa43a
Create Date: 2025-07-24 19:51:31.659214

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8e4d478069f3'
down_revision: Union[str, Sequence[str], None] = '2262da0fa43a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('restaurants', sa.Column('photo_url', sa.String(length=250), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('restaurants', 'photo_url')
    # ### end Alembic commands ###
